import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

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
      <button onClick={() => handleClick()}>Confirm Purchase</button>
    </>
  );
}

export default Checkout;
