const { DataTypes } = require('sequelize');
const Sequelize = require('../db.ts');

const Status = Sequelize.define('status', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

const Order = Sequelize.define('order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  adress: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  deliveredDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});
const OrderDeliveryInfo = Sequelize.define('order_delivery_info', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING || DataTypes.INTEGER,
    allowNull: false,
  },
  extraInfo: {
    type: DataTypes.STRING,
  },
});
const OrderProduct = Sequelize.define('order_product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  count: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});
module.exports = {
  Status,
  Order,
  OrderDeliveryInfo,
  OrderProduct,

};
export {};
