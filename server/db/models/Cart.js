const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define("cart", {
  // o: why is quantity here instead of in cart_product
  quantity: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Cart;
