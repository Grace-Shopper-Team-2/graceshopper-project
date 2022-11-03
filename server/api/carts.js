const router = require("express").Router();
const Cart = require("../db/models/Cart");
const Product = require("../db/models/Product");
const User = require("../db/models/User");
const CartProducts = require("../db/models/CartProducts");

const { loadUser } = require("./middleware");

router.get("/", async (req, res, next) => {
  try {
    const allCartProducts = await CartProducts.findAll();
    res.json(allCartProducts);
  } catch (error) {
    next(error);
  }
});

//api/carts/user/id
router.get("/user/:id", async (req, res, next) => {
  try {
    const items = await CartProducts.findAll({
      where: {
        userId: req.params.id,
      },
    });

    res.json(items);
  } catch (error) {
    next(error);
  }
});

// router.delete("/user/:id", async(req,res,next)=>{
//   console.log("H")
//   const items = await CartProducts.findAll({
//     where: {
//       userId: req.params.id,
//     },
//   });

//   console.log("DELETE ALL",items)
// })
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


router.post("/:id", async (req, res, next) => {
  const { id, price, name, imageUrl } = req.body.product;

  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.body.userId,
      },
    });
    if (cart) {
      const cartProducts = await CartProducts.create({
        userId: req.body.userId,
        productId: id,
        quantity: 1,
        productName: name,
        productPrice: price,
        imageUrl: imageUrl,
      });
      res.json(cartProducts);
    }
  } catch (err) {
    next(err);
  }
});

//updates the cart with the product
router.put("/:id", async (req, res, next) => {

  const { id } = req.body.product;
  try {
    const cartProducts = await CartProducts.findOne({
      where: {
        // userId: req.user.dataValues.id,
        userId: req.body.userId,
      },
      // include: {
      //   model: Product,
      //   where: {
      //     id: id,
      //   },
      // },
    });
    await cartProducts.update({
      where: {
        userId: req.body.userId,

        productId: id,
      },
    });
  } catch (error) {
    next(error);
  }
});

// had to set up strange routes below due to time constraints
router.get("/allItems/:id", async (req,res,next)=>{
  try{
    console.log(req.params)
    const  item = await CartProducts.findByPk(req.params.id);
    res.send(item)
  }catch(error){
    console.error(error)
  }
})
//delete product by id
router.delete("/allItems/:id", async (req, res, next) => {
  try {
    const item = await CartProducts.findByPk(req.params.id);
    await item.destroy();
    res.send(item);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
