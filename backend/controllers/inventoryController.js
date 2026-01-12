const db = require('../models');

exports.getAll = async (req, res) => {
  try {
    const products = await db.Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar estoque' });
  }
};

exports.updateStock = async (req, res) => {
  try {
    const product = await db.Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    product.stock = req.body.stock;
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar estoque' });
  }
};
