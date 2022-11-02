import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";
import AdminPage from "../admin/AdminPage";
import UserCart from "../userCart/UserCart";

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const username = useSelector((state) => state.auth.me.username);
  const isAdmin = useSelector((state) => state.auth.me.isAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  const adminPage = () => {
    dispatch(AdminPage());
    navigate("/adminPage");
  };

  const totalNumOfItemsInCart = (arr) => {
    let total = 0;
    arr.forEach((item) => (total = total + item.cartQuantity));
    return total;
  };

  return (
    <div>

      <h1>FS-App-Template</h1>
      <nav>
        {isLoggedIn ? ( isAdmin? <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/user-cart">Cart</Link>
            <Link to="/adminPage">Admin Page</Link>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
            <p>Logged in as: {username}</p>
          </div>:
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/user-cart">Cart</Link>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
            <p>Logged in as: {username}</p>
          </div>

        ) : (
          <div className="login-info">
            {/* The navbar will show these links before you log in */}
            <Link to="/home">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/products">Products</Link>
            <Link to="/cart">
              {" "}
              {`Cart (${totalNumOfItemsInCart(cart.cartItems)})`}{" "}
            </Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
