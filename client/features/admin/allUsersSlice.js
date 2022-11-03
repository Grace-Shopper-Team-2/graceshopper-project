import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const TOKEN = 'token';

export const fetchUsers = createAsyncThunk('users', async () => {
	const token = window.localStorage.getItem(TOKEN);
	try {
		if (token) {
			console.log('token', token);
			const res = await axios.get('/api/users', {
				headers: {
					authorization: token,
				},
			});
			return res.data;
		} else {
			return {};
		}
	} catch (error) {
		return error.message;
	}
});

export const fetchSingleUser = createAsyncThunk('users/findOne', async (id) => {
	try {
		const { data } = await axios.get(`/api/users/${id}`);
		return data;
	} catch (error) {
		console.error(error);
	}
});

export const deleteUserAsync = createAsyncThunk('deleteUser', async (id) => {
	try {
		const { data } = await axios.delete(`/api/users/${id}`);
		return data;
	} catch (error) {
		console.error(error);
	}
});

export const editUser = createAsyncThunk(
	'user/editUser',
	async ({ id, firstName, lastName, email, address }) => {
		try {
			console.log('slice');
			console.log('id', id);
			console.log(firstName);
			console.log(lastName);
			console.log(email);
			console.log(address);

			const { data } = await axios.put(`/api/users/${id}`, {
				firstName,
				lastName,
				email,
				address,
			});
			return data;
		} catch (error) {
			console.error(error);
		}
	}
);

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
