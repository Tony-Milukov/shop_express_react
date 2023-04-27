const { DataTypes } = require('sequelize');
const Sequelize = require('../db.ts');

const User = Sequelize.define('user', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
    validate: {
      len: [4, 50],
    },
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
export {};
