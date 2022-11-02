import React from "react";
import { useSelector } from "react-redux";

const UserCart = () => {
  const cart = useSelector((state) => state.cartForUser);
  console.log(cart);
  return (
    <div>
      <h2>Shopping Cart</h2>
      <h2></h2>
      {/* {cart.cartItems.length === 0 ? <EmptyCart /> : <CartItems />} */}
    </div>
  );
};

export default UserCart;
