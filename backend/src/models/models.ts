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
  img: {
    type: DataTypes.STRING,
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

Product.hasMany(BasketItem);
BasketItem.belongsTo(Product);

Product.hasMany(Description);
Description.belongsTo(Product);

Category.hasMany(ProductsCategory);
ProductsCategory.belongsTo(Category);

Product.hasMany(ProductsCategory);
ProductsCategory.belongsTo(Product);

Product.hasMany(ProductsBrand);
ProductsBrand.belongsTo(Product);

Brand.hasMany(ProductsBrand);
ProductsBrand.belongsTo(Brand);

module.exports = {
  User,
  Basket,
  BasketItem,
  Product,
  Description,
  Brand,
  Category,
  UserRole,
  Role,
  ProductsCategory,
  ProductsBrand,
};

export {};
