const db = require('../models');

exports.getAll = async (req, res) => {
  try {
    const transactions = await db.Transaction.findAll();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar transações' });
  }
};

exports.getSummary = async (req, res) => {
  try {
    const transactions = await db.Transaction.findAll();
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + parseFloat(t.value), 0);
    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + parseFloat(t.value), 0);
    
    res.json({
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao calcular resumo financeiro' });
  }
};

exports.create = async (req, res) => {
  try {
    const transaction = await db.Transaction.create(req.body);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar transação' });
  }
};
