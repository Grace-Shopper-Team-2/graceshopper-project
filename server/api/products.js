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
      const err = new Error("Product not found !");
      err.status = 404;
    }
  } catch (err) {
    next(err);
  }
});

// api route to delete one product based on req.params.id
router.delete("/:id", async (req, res, next) => {
  try {
    // o: always check for when you can't find the resource
    const product = await Product.findByPk(req.params.id);
    await product.destroy();

    res.send(product);
  } catch (error) {
    next(error);
  }
});

// api route to add one product into the database
router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    // o: always check for when you can't find the resource
    const product = await Product.findByPk(req.params.id);
    await product.update(req.body);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
