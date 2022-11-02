const router = require("express").Router();
const Cart = require("../db/models/Cart");
const Product = require("../db/models/Product");
const User = require("../db/models/User");
const CartProducts = require("../db/models/CartProducts");

const { loadUser } = require("./middleware");

//api route to get cart based on the userID
//route is `api/user/:id/cart`
router.get("/:id", loadUser, async (req, res, next) => {
  try {
    //find or create the cart by the user id
    const cart = await Cart.findOrCreate({
      where: { userId: req.user.dataValues.id },
    });
    console.log(req.user);
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
});

router.post("/:id", loadUser, async (req, res, next) => {
  const { id } = req.body.product;
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.user.dataValues.id,
      },
    });
    console.log(cart);
    if (cart) {
      const cartProducts = await CartProducts.create({
        userId: req.user.dataValues.id,
        id,
      });
      res.json(cartProducts);
    }
  } catch (err) {
    next(err);
  }
});

//updates the cart with the product
router.put("/:id", loadUser, async (req, res, next) => {
  const { id } = req.body.product;
  try {
    const cartProducts = await CartProducts.findOne({
      where: {
        userId: req.user.dataValues.id,
      },
      include: {
        model: Product,
        where: {
          id: id,
        },
      },
    });
    cartProducts.update({
      where: {
        userId: req.user.dataValues.id,
        productId: id,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
