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
  async (product, userId) => {
    try {
      console.log(product, userId);
      const { data } = await axios.put(`/api/:/${userId}/cart`, product);
      return data;
    } catch (err) {
      console.error("adding to cart failed, err.message");
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
      state.cartItems.push(action.payload);
      state.cartTotalQuantity++;
    });
  },
});

export default cartForUserSlice.reducer;
