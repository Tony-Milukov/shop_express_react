const { DataTypes } = require('sequelize');
const Sequelize = require('../db.ts');

const Basket = Sequelize.define('basket', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});
const BasketItem = Sequelize.define('basket_item', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});
module.exports = {
  BasketItem, Basket,
};
export {};
