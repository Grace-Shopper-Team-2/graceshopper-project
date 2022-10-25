const router = require("express").Router();
const Product = require("../db/models/Product");

//api route to get all products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

//api route to get one product based on req.params.id
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      const err = new Error("API route not found");
      err.status = 404;
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
