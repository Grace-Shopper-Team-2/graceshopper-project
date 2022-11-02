import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//initial state
const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const TOKEN = "token";

//add items to user's cart based on userID
export const addToUserCart = createAsyncThunk(
  "cart/add",
  async ({ product, userId }) => {
    console.log(product, userId);
    const token = window.localStorage.getItem(TOKEN);
    try {
      if (token) {
        const res = await axios.get(`api/carts/${userId}`, {
          headers: {
            authorization: token,
          },
        });
        if (res) {
          const { data } = await axios.post(`api/carts/${userId}`, {
            headers: {
              authorization: token,
            },
            product,
          });
          return data;
        }
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
    });
  },
});

export default cartForUserSlice.reducer;
