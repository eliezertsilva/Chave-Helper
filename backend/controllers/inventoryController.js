const db = require('../models');

exports.getAll = async (req, res) => {
  try {
    const products = await db.Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar estoque' });
  }
};

exports.create = async (req, res) => {
  try {
    const product = await db.Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar produto' });
  }
};

exports.update = async (req, res) => {
  try {
    const product = await db.Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    await product.update(req.body);
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar produto' });
  }
};

exports.delete = async (req, res) => {
  try {
    const product = await db.Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    await product.destroy();
    res.json({ message: 'Produto excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir produto' });
  }
};
