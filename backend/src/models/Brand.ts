const { DataTypes } = require('sequelize');
const Sequelize = require('../db.ts');

const Brand = Sequelize.define('brand', {
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
const ProductsBrand = Sequelize.define('products_brand', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports = {
  ProductsBrand,
  Brand,
};
export {};
