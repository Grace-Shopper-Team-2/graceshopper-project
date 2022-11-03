import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//initial state
// const initialState = {
//   cartItems: [],
//   cartTotalQuantity: 0,
//   cartTotalAmount: 0,
// };

const TOKEN = "token";
export const fetchCartAsync = createAsyncThunk("cart/get", async (userId) => {
  const { data } = await axios.get(`/api/carts/user/${userId}`);
  console.log(data);
  return data;
});

//add items to user's cart based on userID
export const addToUserCart = createAsyncThunk(
  "cart/add",
  async ({ product, userId }) => {
    const token = window.localStorage.getItem(TOKEN);
    try {
      if (token) {
        const res = await axios.get(`api/carts/${userId}`, {
          headers: {
            authorization: token,
          },
        });
        if (res) {
          console.log("res:", res);
          const { data } = await axios.post(`api/carts/${userId}`, {
            headers: {
              authorization: token,
            },
            product,
            userId,
          });
          return data;
        }
      }
    } catch (err) {
      console.error("adding to cart failed", err.message);
    }
  }
);



export const getTotalAsync = createAsyncThunk("cart/get", async (id) => {});

export const removeFromCartAsync = createAsyncThunk(
  "cart/remove",
  async (id) => {
    try {
      const { data } = await axios.delete(`/api/carts/allItems/${id}`);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const clearEntireCartAsync = createAsyncThunk("cart/clear", async(id)=>{
  try {
    const { data } = await axios.delete(`/api/carts/allItems/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
}
)


//cart for user slice
const cartForUserSlice = createSlice({
  name: "cartForUser",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToUserCart.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(fetchCartAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default cartForUserSlice.reducer;
