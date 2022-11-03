import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartAsync } from "./cartForUser";
import { Link } from "react-router-dom";

const UserCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartForUser);
  const userId = useSelector((state) => state.auth.me.id);
  console.log(userId);
  console.log("CART:", cart);

  useEffect(() => {
    dispatch(fetchCartAsync(userId));
  }, [dispatch]);
  // console.log("cart.items:",cart)
  let userItems = cart.filter((currentItem) => {
    if (currentItem.userId === userId) {
      return currentItem;
    }
  });
  // console.log("userItems:", userItems[0]);
  return (
    <div id="user-cart">
      <h1>Items</h1>
      <p></p>
      <div>
        {userItems.map((currentItem) => (
          <div key={currentItem.id}>
            <img src={currentItem.imageUrl} alt={currentItem.productName} height= "100" width = "100"/>
            <div>
              <h3>{currentItem.productName}</h3>
              {/* <button onClick={() => handleRemoveFromCart(cartItem)}>
              Remove
            </button> */}
            </div>
            <div>${currentItem.productPrice}</div>
          </div>
        ))}
      </div>

      {/* <div className="cart-quantity">
        <button onClick={() => handleDecrease(cartItem)}>-</button>
        <div>{cartItem.cartQuantity}</div>
        <button onClick={() => handleIncrease(cartItem)}>+</button>
      </div> */}
      {/* <div className="cart-total">
        ${cartItem.price * cartItem.cartQuantity}
      </div> */}
      <div className="cart-summary">
        {/* <button className="clear-cart" onClick={() => handleClearCart()}>
          Clear Cart
        </button> */}
        <div className="check-out">
          <div className="subtotal">
            <span>Subtotal</span>
            {/* <span className="amount">${cart.cartTotalAmount}</span> */}
          </div>
          <p>Taxes and shipping</p>
          {/* <button onClick={() => navigate("/checkout")}>Check Out</button> */}
          <div>
            <Link to="/products">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Start Shopping </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCart;
