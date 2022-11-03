const router = require("express").Router();
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51LziHZFLqGJqqYYSq2BV50ExNclfkZv20xJSMHcjLQiWXGXJa5KveYSYya4ViRm0u59D9vGrdNgMdXQdwoRojfHi008OEJK4zx"
);

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        console.log(stripeErr);
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
