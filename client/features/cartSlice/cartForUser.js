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
    try {
      //first check if cart exist by sending get request
      const res = await axios.get(`api/user/${userId}/cart`);
      console.log(res);
      //if it doesn't we create a cart with the userId and return it
      if (res.status === 404) {
        const { data } = await axios.post(`api/user/${userId}/cart`, product);
        return data;
        //if it does, we update it with the product passed in as req.body
      } else {
        const { data } = await axios.put(`/api/user/${userId}/cart`, product);
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
      state.cartItems.push(action.payload);
      state.cartTotalQuantity++;
    });
  },
});

export default cartForUserSlice.reducer;
