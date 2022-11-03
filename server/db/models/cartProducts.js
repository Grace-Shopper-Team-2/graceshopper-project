const Sequelize = require("sequelize");
const db = require("../db");

const CartProducts = db.define("CartProducts", {
  userId: {
    type: Sequelize.INTEGER,
  },
  productId: {
    type: Sequelize.INTEGER,
  },
  productName:{
    type: Sequelize.STRING
  },
  productPrice:{
    type: Sequelize.DECIMAL(10,2),
  },
  imageUrl:{
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER,

    defaultValue: 0

  },
});

module.exports = CartProducts;
