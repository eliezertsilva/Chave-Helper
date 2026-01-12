const sequelize = require('../config/database');
const User = require('./User');
const Client = require('./Client');
const Product = require('./Product');
const Service = require('./Service');
const Transaction = require('./Transaction');

const db = {
  sequelize,
  User,
  Client,
  Product,
  Service,
  Transaction,
};

module.exports = db;
