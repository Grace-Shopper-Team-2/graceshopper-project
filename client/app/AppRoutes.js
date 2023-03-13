import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";

import ProfilePage from "../features/profilePage/profilePage";

import AllProducts from "../features/allProducts/AllProducts";
import SingleProduct from "../features/singleProducts/SingleProduct";
import AdminPage from "../features/admin/AdminPage";
import Cart from "../features/localCart/Cart";
import EditProductForm from "../features/admin/EditProductsForm";
import Checkout from "../features/checkout/Checkout";
import PurchaseConfirmed from "../features/checkout/PurchaseConfirmed";

import UserCheckout from "../features/userCart/UserCheckout";

import UserCart from "../features/userCart/UserCart";

import { me } from "./store";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => state.auth.me.isAdmin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        isAdmin ? (
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/usercheckout" element={<UserCheckout />} />
            <Route path="/purchase-confirmed" element={<PurchaseConfirmed />} />
            <Route path="/home" element={<Home />} />

            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:productId" element={<SingleProduct />} />
            <Route path="/user-cart" element={<UserCart />} />

            <Route path="/profilePage" element={<ProfilePage />} />

            <Route path="/adminPage" element={<AdminPage />} />
            <Route
              path="/adminPage/product/:productId"
              element={<EditProductForm />}
            />
          </Routes>
        ) : (
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/home" element={<Home />} />

            <Route path="/usercheckout" element={<UserCheckout />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:productId" element={<SingleProduct />} />
            <Route path="/user-cart" element={<UserCart />} />
            <Route path="/purchase-confirmed" element={<PurchaseConfirmed />} />
            <Route path="/profilePage" element={<ProfilePage />} />
          </Routes>
        )
      ) : (
        <Routes>
          <Route path="/*" element={<Home />} />

          {/* <Route
            path="/*"
            element={<AuthForm name="login" displayName="Login" />}
          /> */}
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
          <Route path="/products" element={<AllProducts />} />

          <Route path="/profilePage" element={<ProfilePage />} />

          <Route path="/products/:productId/*" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/usercheckout" element={<UserCheckout />} />
          <Route path="/purchase-confirmed" element={<PurchaseConfirmed />} />
          {/* <Route path="/adminPage" element={<AdminPage />} />
        				<Route path = "/adminPage/product/:productId" element = {<EditProductForm />} /> */}
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
