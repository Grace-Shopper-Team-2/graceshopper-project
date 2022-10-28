import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//initial state
const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

//add items to user's cart based on userID
export const addToUserCart = createAsyncThunk("cart/add", async (id) => {
  try {
    const { data } = await axios.get(`/api/`);
  } catch (err) {
    console.error("adding to cart failed, err.message");
  }
});

//cart for user slice
const cartForUserSlice = createSlice({
  name: "cartForUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToUserCart);
  },
});

export const {} = cartForUserSlice.actions;

export default cartSlice.reducer;
