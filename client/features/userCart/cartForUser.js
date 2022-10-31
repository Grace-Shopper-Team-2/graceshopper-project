import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//initial state
const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

//add items to user's cart based on userID
export const addToUserCart = createAsyncThunk(
  "cart/add",
  async ({ product, userId }) => {
    //console.log(product, userId);
    try {
      //first check if cart exist by sending get request
      const res = await axios.get(`api/user/${userId}/cart`);
      console.log(res);

      if (res.data) {
        const { data } = await axios.put(
          `/api/user/${userId}/cart`,
          product.id
        );
        return data;
      }
    } catch (err) {
      console.error("adding to cart failed", err.message);
    }
  }
);

//cart for user slice
const cartForUserSlice = createSlice({
  name: "cartForUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToUserCart.fulfilled, (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity++;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
      }
    });
  },
});

export default cartForUserSlice.reducer;
