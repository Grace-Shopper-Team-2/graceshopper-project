import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const TOKEN = "token";

export const fetchUsers = createAsyncThunk("users", async () => {
  const token = window.localStorage.getItem(TOKEN);
  try {
    if (token) {
      const res = await axios.get('/api/users', {
        headers:{
          authorization: token
        }
      })
      return res.data;
    }else{
      return {};
    }
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
      return action.payload;
    });
  },
});

export default allUsersSlice.reducer;
