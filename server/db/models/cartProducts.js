const Sequelize = require("sequelize");
const db = require("../db");

const CartProducts = db.define("CartProducts", {
  userId: {
    type: Sequelize.INTEGER,
  },
  productId: {
    type: Sequelize.INTEGER,
  },
  quantity: {
    type: Sequelize.INTEGER,

    defaultValue: 0

  },
});

module.exports = CartProducts;
