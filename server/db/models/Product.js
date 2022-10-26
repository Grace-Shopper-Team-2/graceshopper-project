const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull:false,
    validate:{
      notEmpty: true
    }
  },
  // o: if you will be using this for categories / filtering the best way to do this is
  //  by having a table of categories and then having a foreign key on this table
  //  that points to the id of the category in the categories table
  type:{ // initially, "type" will be wands, but if we want to branch out to other magical products, it might be smart to have a type field.
    type: Sequelize.STRING,
    allowNullL: false
  },
  price: {
    // (10,2) rounds to nearest decimal at the second decimal place
    type: Sequelize.DECIMAL(10,2),
    allowNull:false
  },
  description:{
    type: Sequelize.TEXT
  },
  imageUrl:{
    type: Sequelize.STRING,
    defaultValue: "https://target.scene7.com/is/image/Target/GUEST_3f98403d-3b9e-4871-b104-2d10d13c1ff0"
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = Product
