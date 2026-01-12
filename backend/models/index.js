const sequelize = require('../config/database');
const User = require('./User');
const Client = require('./Client');
const Product = require('./Product');
const Service = require('./Service');
const Transaction = require('./Transaction');
const ServiceItem = require('./ServiceItem');

// Define associations
Service.belongsToMany(Product, { through: ServiceItem });
Product.belongsToMany(Service, { through: ServiceItem });
ServiceItem.belongsTo(Service);
ServiceItem.belongsTo(Product);
Service.hasMany(ServiceItem);
Product.hasMany(ServiceItem);

const db = {
  sequelize,
  User,
  Client,
  Product,
  Service,
  Transaction,
  ServiceItem,
};

module.exports = db;
