const { DataTypes } = require('sequelize');
const Sequelize = require('../db.ts');

const Category = Sequelize.define('category', {
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
const ProductsCategory = Sequelize.define('products_category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});
module.exports = {
  ProductsCategory,
  Category,
};
export {};
