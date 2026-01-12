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
    const service = await db.Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ message: 'Serviço não encontrado' });
    service.status = req.body.status;
    await service.save();
    res.json(service);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar status' });
  }
};
