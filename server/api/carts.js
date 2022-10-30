const router = require("express").Router();
const Cart = require("../db/models/Cart");
const Product = require("../db/models/Product");
const User = require("../db/models/User");

//api route to get cart based on the userID
router.put("/:id/cart", async (req, res, next) => {
  try {
    console.log(req.params.id);
    //find the product based on req.params.id
    const product = Product.findByPk(req.params.id);

    //destructure info we need from req.body
    const { userId } = req.body;

    //find the cart based on userId from req.body
    const cart = Cart.findByPk(userId);

    //if the cart doesn't exist for that user, create it with info from req.body
    if (!cart) {
      await cart.create({ userId: userId, product: product });
      res.status(201).json(cart);
    } else {
      await cart.update(product);
      res.json(cart);
    }
  } catch (err) {
    next(err);
  }
  /*
  router.put('/:id', async (req, res, next) => {
	try {
		const cart = await Cart.findByPk(req.params.id);
		res.json(await cart.update(req.body));
	} catch (error) {
		next(error);
	}
});
   */
});

module.exports = router;
