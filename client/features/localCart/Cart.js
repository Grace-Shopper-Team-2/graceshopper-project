import React, { useEffect } from "react";

import EmptyCart from "./EmptyCart";
import CartItems from "./CartItems";
import { useSelector } from "react-redux";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? <EmptyCart /> : <CartItems />}
    </div>
  );
};

export default Cart;
