const router = require("express").Router();
const Cart = require("../db/models/Cart");

//api route to get cart based on the userID
router.post("/:id", async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(req.params.id);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
