const router = require("express").Router();
const Cart = require("../db/models/Cart");
const Product = require("../db/models/Product");
const User = require("../db/models/User");

//api route to get cart based on the userID
//route is `api/user/:id/cart`
router.get("/:id/cart", async (req, res, next) => {
  try {
    //get the cart by the id

    // o: remove if route is working and tested
    console.log("req.params.id ", req.params.id);
    const cart = await Cart.findByPk(req.params.id);
    if (!cart) {
      // o: you should be able to retrieve this id thru req.user... will explain
      //  in SM
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
      // o: remove if route is working and tested
      console.log(req.body);
      const { userId } = req.body;
      res.status(201).json(
        await Cart.create({
          // o: you can just do where: { userId } here and it will set the key
          //  userId to the value of userId 
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
  // /api/carts/:id
  router.put("/:id/cart", async (req, res, next) => {
    try {
      // o: always check for when you can't find the resource
      const cart = await Cart.findByPk(req.params.id);
      res.json(await cart.createProduct(req.body));
    } catch (error) {
      next(error);
    }
  });
});

module.exports = router;
