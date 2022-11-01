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

// o: this structure might be problematic for some of the Tier 2 stuff... will explain
//  in SM... also the name should be camelCased since its the name of the table you
//  are noting here
Cart.belongsToMany(Product, { through: "cart_product" });
Product.belongsToMany(Cart, { through: "cart_product" });

// carts
// ----
// id: integer
// quantity: integer

// cart_products
// -----
// cartId: integer
// productId: integer
// quantity: integer

module.exports = {
  db,
  models: {
    User,
    Product,
    Cart,
  },
};
