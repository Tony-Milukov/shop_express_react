const { DataTypes } = require('sequelize');
const Sequelize = require('../db.ts');

const Rating = Sequelize.define('rating', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    validate: {
      is: /^[0-5]$/,
    },
  },
});
module.exports = Rating;

export {};
