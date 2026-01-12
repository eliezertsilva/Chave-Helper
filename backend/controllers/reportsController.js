const db = require('../models');
const { Op } = require('sequelize');

// Dashboard Summary
exports.getDashboard = async (req, res) => {
  try {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    // Services statistics
    const [totalServices, monthServices, completedServices] = await Promise.all([
      db.Service.count(),
      db.Service.count({ where: { createdAt: { [Op.gte]: startOfMonth } } }),
      db.Service.count({ where: { status: 'completed' } })
    ]);

    // Financial statistics
    const [totalRevenue, monthRevenue] = await Promise.all([
      db.Transaction.sum('value', { where: { type: 'income' } }),
      db.Transaction.sum('value', { 
        where: { 
          type: 'income',
          createdAt: { [Op.gte]: startOfMonth }
        } 
      })
    ]);

    // Inventory statistics
    const [totalProducts, lowStockProducts] = await Promise.all([
      db.Product.count(),
      db.Product.count({ 
        where: db.sequelize.where(
          db.sequelize.col('stock'),
          '<=',
          db.sequelize.col('minStock')
        )
      })
    ]);

    // Clients statistics
    const [totalClients, activeClients] = await Promise.all([
      db.Client.count(),
      db.Client.count({ where: { status: 'active' } })
    ]);

    res.json({
      services: {
        total: totalServices,
        thisMonth: monthServices,
        completed: completedServices,
        completionRate: totalServices > 0 ? ((completedServices / totalServices) * 100).toFixed(1) : 0
      },
      financial: {
        totalRevenue: totalRevenue || 0,
        monthRevenue: monthRevenue || 0
      },
      inventory: {
        totalProducts,
        lowStockProducts,
        stockHealth: totalProducts > 0 ? (((totalProducts - lowStockProducts) / totalProducts) * 100).toFixed(1) : 100
      },
      clients: {
        total: totalClients,
        active: activeClients
      }
    });
  } catch (error) {
    console.error('Error getting dashboard:', error);
    res.status(500).json({ message: 'Erro ao buscar dados do dashboard' });
  }
};

// Sales by period
exports.getSalesByPeriod = async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    let groupBy;
    let dateFormat;

    switch (period) {
      case 'day':
        groupBy = db.sequelize.fn('DATE', db.sequelize.col('createdAt'));
        dateFormat = '%Y-%m-%d';
        break;
      case 'week':
        groupBy = db.sequelize.fn('YEARWEEK', db.sequelize.col('createdAt'));
        dateFormat = '%Y-%u';
        break;
      case 'year':
        groupBy = db.sequelize.fn('YEAR', db.sequelize.col('createdAt'));
        dateFormat = '%Y';
        break;
      default: // month
        groupBy = db.sequelize.fn('DATE_FORMAT', db.sequelize.col('createdAt'), '%Y-%m');
        dateFormat = '%Y-%m';
    }

    const sales = await db.Transaction.findAll({
      attributes: [
        [groupBy, 'period'],
        [db.sequelize.fn('SUM', db.sequelize.col('value')), 'total'],
        [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'count']
      ],
      where: { type: 'income' },
      group: [groupBy],
      order: [[groupBy, 'ASC']],
      raw: true
    });

    res.json(sales);
  } catch (error) {
    console.error('Error getting sales by period:', error);
    res.status(500).json({ message: 'Erro ao buscar vendas por período' });
  }
};

// Most used products
exports.getTopProducts = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const topProducts = await db.ServiceItem.findAll({
      attributes: [
        'ProductId',
        [db.sequelize.fn('SUM', db.sequelize.col('quantity')), 'totalUsed'],
        [db.sequelize.fn('COUNT', db.sequelize.col('ServiceItem.id')), 'timesUsed']
      ],
      include: [{
        model: db.Product,
        attributes: ['name', 'category', 'price', 'stock']
      }],
      group: ['ProductId', 'Product.id'],
      order: [[db.sequelize.fn('SUM', db.sequelize.col('quantity')), 'DESC']],
      limit: parseInt(limit)
    });

    res.json(topProducts);
  } catch (error) {
    console.error('Error getting top products:', error);
    res.status(500).json({ message: 'Erro ao buscar produtos mais usados' });
  }
};

// Service status distribution
exports.getServiceStatus = async (req, res) => {
  try {
    const statusDistribution = await db.Service.findAll({
      attributes: [
        'status',
        [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'count']
      ],
      group: ['status'],
      raw: true
    });

    res.json(statusDistribution);
  } catch (error) {
    console.error('Error getting service status:', error);
    res.status(500).json({ message: 'Erro ao buscar status dos serviços' });
  }
};

// Revenue by category
exports.getRevenueByCategory = async (req, res) => {
  try {
    const revenueByCategory = await db.Transaction.findAll({
      attributes: [
        'category',
        [db.sequelize.fn('SUM', db.sequelize.col('value')), 'total'],
        [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'count']
      ],
      where: { type: 'income' },
      group: ['category'],
      order: [[db.sequelize.fn('SUM', db.sequelize.col('value')), 'DESC']],
      raw: true
    });

    res.json(revenueByCategory);
  } catch (error) {
    console.error('Error getting revenue by category:', error);
    res.status(500).json({ message: 'Erro ao buscar receita por categoria' });
  }
};

// Inventory turnover
exports.getInventoryTurnover = async (req, res) => {
  try {
    const products = await db.Product.findAll({
      attributes: ['id', 'name', 'category', 'stock', 'minStock', 'price'],
      include: [{
        model: db.ServiceItem,
        attributes: [[db.sequelize.fn('SUM', db.sequelize.col('ServiceItems.quantity')), 'totalUsed']],
        required: false
      }],
      group: ['Product.id']
    });

    const turnover = products.map(p => ({
      id: p.id,
      name: p.name,
      category: p.category,
      stock: p.stock,
      minStock: p.minStock,
      price: p.price,
      totalUsed: p.ServiceItems && p.ServiceItems.length > 0 ? 
        parseInt(p.ServiceItems[0].dataValues.totalUsed) || 0 : 0,
      turnoverRate: p.stock > 0 ? 
        ((p.ServiceItems && p.ServiceItems.length > 0 ? 
          parseInt(p.ServiceItems[0].dataValues.totalUsed) || 0 : 0) / p.stock).toFixed(2) : 0
    }));

    res.json(turnover);
  } catch (error) {
    console.error('Error getting inventory turnover:', error);
    res.status(500).json({ message: 'Erro ao buscar giro de estoque' });
  }
};
