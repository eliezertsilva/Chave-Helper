const db = require('../models');

// Get all items for a specific service
exports.getByService = async (req, res) => {
  try {
    const items = await db.ServiceItem.findAll({
      where: { ServiceId: req.params.serviceId },
      include: [db.Product]
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar itens do serviço' });
  }
};

// Add item to service
exports.create = async (req, res) => {
  try {
    const { ServiceId, ProductId, quantity, unitPrice } = req.body;
    
    // Check if product exists and has enough stock
    const product = await db.Product.findByPk(ProductId);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    
    const item = await db.ServiceItem.create({
      ServiceId,
      ProductId,
      quantity,
      unitPrice: unitPrice || product.price
    });
    
    const itemWithProduct = await db.ServiceItem.findByPk(item.id, {
      include: [db.Product]
    });
    
    res.status(201).json(itemWithProduct);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao adicionar item ao serviço' });
  }
};

// Update service item
exports.update = async (req, res) => {
  try {
    const item = await db.ServiceItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item não encontrado' });
    
    await item.update(req.body);
    
    const updatedItem = await db.ServiceItem.findByPk(item.id, {
      include: [db.Product]
    });
    
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar item' });
  }
};

// Delete service item
exports.delete = async (req, res) => {
  try {
    const item = await db.ServiceItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item não encontrado' });
    
    await item.destroy();
    res.json({ message: 'Item removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover item' });
  }
};
