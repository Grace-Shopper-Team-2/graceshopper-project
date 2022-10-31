const router = require("express").Router();
const Cart = require("../db/models/Cart");
const Product = require("../db/models/Product");
const User = require("../db/models/User");

//api route to get cart based on the userID
//route is `api/user/:id/cart`
router.get("/:id/cart", async (req, res, next) => {
  try {
    //get the cart by the id
    console.log("req.params.id ", req.params.id);
    const cart = await Cart.findByPk(req.params.id);
    if (!cart) {
      const cart = await Cart.create({ userId: req.params.id });
      return res.status(202).json(cart);
    } else {
      res.json(cart);
    }
  } catch (err) {
    next(err);
  }

  //creates cart assigned to userId with the product passed in as req.body
  router.post("/:id/cart", async (req, res, next) => {
    try {
      console.log(req.body);
      const { userId } = req.body;
      res.status(201).json(
        await Cart.create({
          where: {
            userId: userId,
          },
        })
      );
    } catch (err) {
      next(err);
    }
  });

  //updates the cart with the product
  router.put("/:id/cart", async (req, res, next) => {
    try {
      const cart = await Cart.findByPk(req.params.id);
      res.json(await cart.createProduct(req.body));
    } catch (error) {
      next(error);
    }
  });
});

module.exports = router;
