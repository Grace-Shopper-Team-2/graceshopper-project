const Sequelize = require("sequelize");
const db = require("../db");

const CartProducts = db.define("cartProducts", {
  userId: {
    type: Sequelize.INTEGER,
  },
  productId: {
    type: Sequelize.INTEGER,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
});

module.exports = CartProducts;
