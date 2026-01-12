const db = require('../models');

// Get all sales
exports.getAll = async (req, res) => {
  try {
    const sales = await db.Transaction.findAll({
      where: { type: 'income' },
      order: [['createdAt', 'DESC']]
    });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar vendas' });
  }
};

// Create direct sale
exports.createSale = async (req, res) => {
  try {
    const { items, paymentMethod, clientId, discount = 0 } = req.body;
    
    // Calculate total
    let total = 0;
    for (const item of items) {
      const product = await db.Product.findByPk(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Produto ${item.productId} não encontrado` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Estoque insuficiente para ${product.name}. Disponível: ${product.stock}` 
        });
      }
      total += parseFloat(product.price) * item.quantity;
    }
    
    const finalTotal = total - discount;
    
    // Create transaction
    const transaction = await db.Transaction.create({
      description: 'Venda Direta',
      value: finalTotal,
      type: 'income',
      status: 'received',
      category: 'Vendas',
      dueDate: new Date()
    });
    
    // Decrease stock
    for (const item of items) {
      const product = await db.Product.findByPk(item.productId);
      await product.update({ stock: product.stock - item.quantity });
    }
    
    res.status(201).json({ transaction, total: finalTotal });
  } catch (error) {
    console.error('Error creating sale:', error);
    res.status(500).json({ message: 'Erro ao criar venda' });
  }
};

// Get sales summary
exports.getSummary = async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    const [todaySales, monthSales, totalSales] = await Promise.all([
      db.Transaction.sum('value', { 
        where: { 
          type: 'income',
          createdAt: { [db.Sequelize.Op.gte]: startOfDay }
        } 
      }),
      db.Transaction.sum('value', { 
        where: { 
          type: 'income',
          createdAt: { [db.Sequelize.Op.gte]: startOfMonth }
        } 
      }),
      db.Transaction.sum('value', { where: { type: 'income' } })
    ]);
    
    res.json({
      today: todaySales || 0,
      month: monthSales || 0,
      total: totalSales || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar resumo de vendas' });
  }
};
