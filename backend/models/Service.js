const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Client = require('./Client');

const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'in_progress', 'completed', 'cancelled'),
    defaultValue: 'pending',
  },
  value: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,
  },
  scheduledDate: {
    type: DataTypes.DATE,
  },
  completionDate: {
    type: DataTypes.DATE,
  },
  notes: {
    type: DataTypes.TEXT,
  },
});

// Associations
Service.belongsTo(Client);
Client.hasMany(Service);

module.exports = Service;
