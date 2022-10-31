import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSingleProduct = createAsyncThunk(
	'singleProduct',
	async (productId) => {
		try {
			const { data } = await axios.get(`/api/products/${productId}`);
			return data;
		} catch (error) {
			console.log(error);
		}
	}
);

const singleProductSlice = createSlice({
	name: 'singleProduct',
	initialState: {},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
			return action.payload;
		});
	},
});

export const selectSingleProduct = (state) => {
	return state.singleProduct;
};

export default singleProductSlice.reducer;
