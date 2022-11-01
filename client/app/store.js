import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import ProductsReducer from "../features/allProducts/ProductsSlice";
import SingleProductReducer from "../features/singleProducts/SingleProductsSlice";
import allUsersSlice from "../features/admin/allUsersSlice";
import cartReducer from "../features/localCart/cartSlice";
import cartForUserReducer from "../features/userCart/cartForUser";

const store = configureStore({
  reducer: {
    // o: why is the naming inconsistent here for all these reducers? 🤔
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
