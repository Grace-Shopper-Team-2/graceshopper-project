import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users", async () => {
  try {
    const { data } = await axios.get("/api/users");
    return data;
  } catch (error) {
    return error.message;
  }
});

export const deleteUserAsync = createAsyncThunk("deleteUser", async (id) => {
  try {
    const { data } = await axios.delete(`/api/users/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
});

const allUsersSlice = createSlice({
  name: "allUsers",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      console.log("ap", action.payload);
      return action.payload;
    });
  },
});

export default allUsersSlice.reducer;
