import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AuthForm from '../features/auth/AuthForm';
import Home from '../features/home/Home';
import AllProducts from '../features/components/AllProducts';
import SingleProduct from '../features/components/SingleProduct';

import AdminPage from '../features/components/AdminPage';

import Cart from "../features/components/Cart";
import EditProductForm from '../features/components/EditProductsForm';


// import { me } from './store';

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route to="/cart" element={<Cart />} />
          <Route to="/home" element={<Home />} />
          <Route to="/products" element={<AllProducts />} />
          <Route to= "/adminPage" element = {<AdminPage />} />
          <Route path = "/adminPage/product/:productId" element = {<EditProductForm />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/*"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
          <Route path="/products" element={<AllProducts />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/products/:productId/*" element={<SingleProduct />} />

          <Route path= "/adminPage" element = {<AdminPage />} />
          <Route path = "/adminPage/product/:productId" element = {<EditProductForm />} />

        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
