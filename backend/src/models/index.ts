const { DataTypes } = require('sequelize');
const Sequelize = require('../db.ts');
const User = require('./User.ts');
const { Basket, BasketItem } = require('./Basket.ts');
const Product = require('./Product.ts');
const { ProductsBrand, Brand } = require('./Brand.ts');
const { Category, ProductsCategory } = require('./Category.ts');
const { Role, UserRole } = require('./Role.ts');
const Rating = require('./Rating.ts');
const { Status, Order, OrderDeliveryInfo } = require('./Order.ts');

User.hasMany(Basket);
Basket.belongsTo(User);

User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

Basket.belongsToMany(Product, { through: BasketItem });
Product.belongsToMany(Basket, { through: BasketItem });

Product.belongsToMany(Category, { through: ProductsCategory });
Category.belongsToMany(Product, { through: ProductsCategory });

Product.belongsToMany(Brand, { through: ProductsBrand });
Brand.belongsToMany(Product, { through: ProductsBrand });

Product.hasMany(Rating);
Rating.belongsTo(Product);

User.hasMany(Rating);
Rating.belongsTo(User);

Order.belongsToMany(Status, { through: 'order_statuses' });
Status.belongsToMany(Order, { through: 'order_statuses' });

User.hasMany(Order);
Order.belongsTo(User);

Order.hasOne(OrderDeliveryInfo);
OrderDeliveryInfo.belongsTo(Order);

Order.belongsToMany(Product, { through: 'order_product' });
Product.belongsToMany(Order, { through: 'order_product' });

module.exports = {
  User,
  Basket,
  BasketItem,
  Product,
  Brand,
  Category,
  UserRole,
  Role,
  Rating,
  ProductsCategory,
  ProductsBrand,
  Status,
  Order,
};

export {};
