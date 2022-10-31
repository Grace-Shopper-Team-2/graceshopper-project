import { createSlice } from "@reduxjs/toolkit";

//initial state
//if there are cartItems existing in localStorage, we get it by the key, which is 'cartItems' and JSON parse it.
// If it doesn't exist, we set it to empty array
const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

//cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      //we use findIndex to determine if we already have that item in the cart
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      //if it exists, we increment the cart quantity
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity++;
      } else {
        //if it doesn't exist, we add the temporary item to the cart with quantity of 1
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
      }
      //add our cartItems from state to our localStorage in stringified from
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      state.cartItems = nextCartItems;
      //update the localStorage as well
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      //if the quantity is greater than 1 we decrease its cartQuantity
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity--;
        //if there is only one, remove it from the cart using filter
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        //update the state to be filtered
        state.cartItems = nextCartItems;
      }
      //set the localStorage to updated state
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart(state, action) {
      //set the cartItems to empty array
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotal(state, action) {
      const totalState = state.cartItems.reduce(
        (cartTotal, item) => {
          const { price, cartQuantity } = item;
          //total for single item
          const itemTotal = price * cartQuantity;

          //add single item total and its quantity to our accumulator
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
          return cartTotal;
        },
        //accumulator(cartTotal)
        { total: 0, quantity: 0 }
      );
      //update our initialState quantity and total
      state.cartTotalQuantity = totalState.quantity;
      state.cartTotalAmount = totalState.total;
    },
  },
});

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotal } =
  cartSlice.actions;

export default cartSlice.reducer;
