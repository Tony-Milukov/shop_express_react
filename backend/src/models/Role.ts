const { DataTypes } = require('sequelize');
const Sequelize = require('../db.ts');

const Role = Sequelize.define('roles', {
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
const UserRole = Sequelize.define('user_role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});
module.exports = {
  UserRole,
  Role,
};
export {};
