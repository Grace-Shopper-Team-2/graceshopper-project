//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Cart = require("./models/Cart");

//Association between User and Cart
//one to one
User.hasOne(Cart);
Cart.belongsTo(User);

//Association between Cart and Product
//one to many
Cart.belongsToMany(Product, { through: "cart_product" });
Product.belongsToMany(Cart, { through: "cart_product" });

module.exports = {
  db,
  models: {
    User,
    Product,
    Cart,
  },
};
