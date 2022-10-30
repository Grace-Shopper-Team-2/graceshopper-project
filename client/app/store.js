import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import ProductsReducer from "../features/ProductsSlice/ProductsSlice";
import SingleProductReducer from "../features/ProductsSlice/SingleProductsSlice";
import allUsersSlice from "../features/UserSlice/allUsersSlice";
import cartReducer from "../features/cartSlice/cartSlice";
import cartForUserReducer from "../features/cartSlice/cartForUser";

const store = configureStore({
  reducer: {
    allUsers: allUsersSlice,
    auth: authReducer,
    products: ProductsReducer,
    cart: cartReducer,
    singleProduct: SingleProductReducer,
    cartForUser: cartForUserReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
