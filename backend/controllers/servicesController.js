const db = require('../models');

exports.getAll = async (req, res) => {
  try {
    const services = await db.Service.findAll({ include: db.Client });
    res.json(services.map(s => ({
      id: s.id,
      description: s.description,
      status: s.status,
      value: s.value,
      client: s.Client ? s.Client.name : 'N/A',
      date: s.scheduledDate
    })));
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar serviços' });
  }
};

exports.create = async (req, res) => {
  try {
    const service = await db.Service.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar serviço' });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const service = await db.Service.findByPk(req.params.id, {
      include: [{ model: db.ServiceItem, include: [db.Product] }]
    });
    
    if (!service) return res.status(404).json({ message: 'Serviço não encontrado' });
    
    const oldStatus = service.status;
    const newStatus = req.body.status;
    
    // If changing to completed, decrease inventory
    if (newStatus === 'completed' && oldStatus !== 'completed') {
      // Get all items for this service
      const serviceItems = await db.ServiceItem.findAll({
        where: { ServiceId: service.id },
        include: [db.Product]
      });
      
      // Decrease stock for each product
      for (const item of serviceItems) {
        if (item.Product) {
          const newStock = item.Product.stock - item.quantity;
          if (newStock < 0) {
            return res.status(400).json({ 
              message: `Estoque insuficiente para ${item.Product.name}. Disponível: ${item.Product.stock}, Necessário: ${item.quantity}` 
            });
          }
          await item.Product.update({ stock: newStock });
        }
      }
      
      // Set completion date
      service.completionDate = new Date();
    }
    
    service.status = newStatus;
    await service.save();
    res.json(service);
  } catch (error) {
    console.error('Error updating service status:', error);
    res.status(400).json({ message: 'Erro ao atualizar status' });
  }
};

exports.update = async (req, res) => {
  try {
    const service = await db.Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ message: 'Serviço não encontrado' });
    await service.update(req.body);
    res.json(service);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar serviço' });
  }
};

exports.delete = async (req, res) => {
  try {
    const service = await db.Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ message: 'Serviço não encontrado' });
    await service.destroy();
    res.json({ message: 'Serviço excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir serviço' });
  }
};
