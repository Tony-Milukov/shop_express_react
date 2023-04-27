const { DataTypes } = require('sequelize');
const validator = require('validator');
const Sequelize = require('../db.ts');

const Status = Sequelize.define('custom_status', {
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
  trackingLink: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
      customValidator(value:any) {
        if (!validator.isUrl(value)) {
          throw { errorMSG: 'Url is required', status: 400 };
        }
      },
    },
  },
  postalCompany: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  trackingCode: {
    type: DataTypes.STRING || DataTypes.INTEGER,
    allowNull: false,
  },
});
module.exports = {
  Status,
  Order,
  OrderDeliveryInfo,

};
export {};
