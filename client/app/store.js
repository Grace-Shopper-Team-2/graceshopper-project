import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import ProductsReducer from "../features/allProducts/ProductsSlice";
import SingleProductReducer from "../features/singleProduct/SingleProductsSlice";
import allUsersSlice from "../features/admin/allUsersSlice";
import cartReducer from "../features/localCart/cartSlice";
import cartForUserReducer from "../features/userCart/cartForUser";

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
