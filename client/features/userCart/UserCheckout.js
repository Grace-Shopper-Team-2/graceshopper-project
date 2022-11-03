import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function getSubtotal(items) {
    let result = 0;
    items.forEach((item) => {
      result += Number(item.productPrice);
    });
    return result;
  }

  const products = useSelector((state) => state.cartForUser);
  console.log(products);
  const subTotal = getSubtotal(products);
  const taxNY = 0.08;
  const shipping = "0.00";
  const estimatedTaxes = subTotal * taxNY;
  const total = estimatedTaxes + subTotal;

  const KEY =
    "pk_test_51LziHZFLqGJqqYYSJk8WVS0XkhQm3P6TIHKmTdE0PXhnv7wUZ4xDq95E6DiGAoR9PnaTkdJ2MruybnvfT4IenhJs005PYU6VZ4";

  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    console.log(token);
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8080/api/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: total.toFixed(2) * 100,
          }
        );

        navigate("/purchase-confirmed");
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken]);

  const handleClick = () => {
    dispatch();
    navigate("/purchase-confirmed");
  };

  return (
    <>
      <div id="order-summary">
        <h1>Order Summary</h1>
        <p>Subtotal: {subTotal.toFixed(2)}</p>
        <p>Shipping: {shipping}</p>
        <p>Est. Tax: {estimatedTaxes.toFixed(2)}</p>
        <p>______________________________________</p>
        <p>Total: {total.toFixed(2)}</p>
      </div>
      <div id="order-details">
        <h1>Order Details</h1>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <img src={product.imageUrl} />
              <p>{product.name}</p>
              <p>${product.price}</p>
              <p>Quantity: {product.cartQuantity}</p>
            </li>
          ))}
        </ul>
      </div>
      {stripeToken ? (
        <h2>Processing... Please wait</h2>
      ) : (
        <StripeCheckout
          name="Diagon Alley Shop"
          image="https://image.shutterstock.com/image-vector/symbol-book-about-harry-potter-600w-2180800337.jpg"
          billingAddress
          shippingAddress
          amount={total * 100}
          token={onToken}
          stripeKey={KEY}
        >
          <button>Make Payment</button>
        </StripeCheckout>
      )}
    </>
  );
}

export default Checkout;
