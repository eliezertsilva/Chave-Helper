const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('income', 'expense'),
    allowNull: false,
  },
  value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'paid', 'received', 'overdue'),
    defaultValue: 'pending',
  },
  dueDate: {
    type: DataTypes.DATEONLY,
  },
  paymentDate: {
    type: DataTypes.DATEONLY,
  },
  category: {
    type: DataTypes.STRING,
  },
});

module.exports = Transaction;
