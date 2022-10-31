import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//initial state has products array and state of null
const initialState = [];

//action to fetch all products from database using asyncThunk
export const fetchProducts = createAsyncThunk(
  "products/productsFetch",
  async () => {
    try {
      const { data } = await axios.get("/api/products");
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

//make a products slice and export its reducer by default
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

// export const selectProducts = (state) => state.products;

export default productsSlice.reducer;
