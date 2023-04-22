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
const Product = Sequelize.define('product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
const Description = Sequelize.define('description', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
const Brand = Sequelize.define('brand', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,

  },
});
const Type = Sequelize.define('type', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,

  },
});
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

User.hasOne(Basket);
Basket.belongsTo(User);

Role.hasMany(UserRole);
UserRole.belongsTo(Role);

User.hasMany(UserRole);
UserRole.belongsTo(User);

Basket.hasMany(BasketItem);
BasketItem.belongsTo(Basket);

Basket.hasMany(Product);
Product.belongsTo(Basket);

Product.hasMany(Description);
Description.belongsTo(Product);

Product.hasMany(Type);
Type.belongsTo(Product);

Product.hasMany(Brand);
Brand.belongsTo(Product);

module.exports = {
  User,
  Basket,
  BasketItem,
  Product,
  Description,
  Brand,
  Type,
  UserRole,
  Role,
};

export {};
