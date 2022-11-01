const router = require("express").Router();
const Cart = require("../db/models/Cart");
const Product = require("../db/models/Product");
const User = require("../db/models/User");
const checkUser = require("./middleware");

//api route to get cart based on the userID
//route is `api/user/:id/cart`
router.get("/:id", checkUser, async (req, res, next) => {
  console.log(req.user);
  try {
    //get the cart by the id

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
  router.post("/:id/", async (req, res, next) => {
    try {
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
  router.put("/:id", async (req, res, next) => {
    try {
      const cart = await Cart.findOrCreate(req.params.id);
      res.json(await cart.addProduct(req.body));
    } catch (error) {
      next(error);
    }
  });
});

module.exports = router;
