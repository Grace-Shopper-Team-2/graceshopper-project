//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Cart = require("./models/Cart");
const cartProduct = require("./models/cartProducts");
//Association between User and Cart
//one to one
User.hasOne(Cart);
Cart.belongsTo(User);

//Association between Cart and Product
//one to many
Cart.belongsToMany(Product, { through: "cartProduct" });
Product.belongsToMany(Cart, { through: "cartProduct" });

module.exports = {
  db,
  models: {
    User,
    Product,
    Cart,
    cartProduct,
  },
};
