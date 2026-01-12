const db = require('../models');

exports.getAll = async (req, res) => {
  try {
    const clients = await db.Client.findAll();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar clientes' });
  }
};

exports.getById = async (req, res) => {
  try {
    const client = await db.Client.findByPk(req.params.id);
    if (!client) return res.status(404).json({ message: 'Cliente não encontrado' });
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar cliente' });
  }
};

exports.create = async (req, res) => {
  try {
    const client = await db.Client.create(req.body);
    res.status(201).json(client);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar cliente', error });
  }
};

exports.update = async (req, res) => {
  try {
    const client = await db.Client.findByPk(req.params.id);
    if (!client) return res.status(404).json({ message: 'Cliente não encontrado' });
    await client.update(req.body);
    res.json(client);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar cliente' });
  }
};

exports.delete = async (req, res) => {
  try {
    const client = await db.Client.findByPk(req.params.id);
    if (!client) return res.status(404).json({ message: 'Cliente não encontrado' });
    await client.destroy();
    res.json({ message: 'Cliente excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir cliente' });
  }
};
