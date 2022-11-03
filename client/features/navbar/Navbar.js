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
      {/* <h1 className="shop-name">Diagon Alley Shop</h1> */}
      <nav className="nav-bar">
        {isLoggedIn ? (
          isAdmin ? (
            <div className="nav">
              {/* The navbar will show these links after you log in */}
              <div className="nav-items">
                <div className="search">
                  <input
                    type={"text"}
                    class="search-box"
                    placeholder="Search Magical Item"
                  />
                  <button class="search-button">Search</button>
                  <Link to="/home">Home</Link>
                  <Link to="/profilePage">Profile Page</Link>
                  <Link to="/products">Shops</Link>
                  <Link to="/adminPage">Admin Page</Link>
                  <button
                    type="button"
                    class="btn btn-light"
                    onClick={logoutAndRedirectHome}
                  >
                    Logout
                  </button>
                  <p>Logged in as: {username}</p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <Link to="/profilePage">Profile Page</Link>
              <Link to="/products">Shops</Link>
              <Link to="/user-cart">Cart</Link>

              <button
                type="button"
                class="btn btn-light"
                onClick={logoutAndRedirectHome}
              >
                Logout
              </button>
              <p>Logged in as: {username}</p>
            </div>
          )
        ) : (
          <div className="login-info">
            <div className="nav">
              {/* The navbar will show these links before you log in */}
              <Link to="/home">Home</Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <div class="dropdown">
                <button
                  class="btn dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Shops
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <Link to="/products">Ollivanders </Link>
                  </li>
                  <li>
                    <a class="dropdown-item disabled">
                      COMING SOON! - Weasleys’ Wizard Wheezes
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item disabled">
                      COMING SOON! - Quality Quidditch Supplies
                    </a>
                  </li>
                </ul>
              </div>
              <Link to="/cart">
                {" "}
                {`Cart (${totalNumOfItemsInCart(cart.cartItems)})`}{" "}
              </Link>
              <div className="nav-items">
                <div class="search">
                  <input
                    type={"text"}
                    class="search-box"
                    placeholder="Search Magical Item"
                  />
                  <button class="search-button">Search</button>
                  {/* <a href="#">
                    <img src="images/cart.webp"></img> */}
                  {/* </a> */}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
