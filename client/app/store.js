import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import ProductsReducer from '../features/ProductsSlice/ProductsSlice';
import SingleProductReducer from '../features/ProductsSlice/SingleProductsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: ProductsReducer,
    singleProduct: SingleProductReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';