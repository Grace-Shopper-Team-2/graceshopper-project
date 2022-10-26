import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import ProductsReducer, {
  fetchProducts,
} from "../features/ProductsSlice/ProductsSlice";

const store = configureStore({
  reducer: { auth: authReducer, products: ProductsReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
