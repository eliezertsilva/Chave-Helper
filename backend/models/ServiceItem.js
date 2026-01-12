const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ServiceItem = sequelize.define('ServiceItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  unitPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

module.exports = ServiceItem;
