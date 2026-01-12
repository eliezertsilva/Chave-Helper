const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00,
  },
  costPrice: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  minStock: {
    type: DataTypes.INTEGER,
    defaultValue: 5,
  },
  category: {
    type: DataTypes.STRING,
  },
  sku: {
    type: DataTypes.STRING,
    unique: true,
  },
});

module.exports = Product;
