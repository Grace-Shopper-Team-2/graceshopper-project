import React from "react";
import { useSelector } from "react-redux";
// import image from "../";

/**
 * COMPONENT
 */

const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div className="hero-section">
      <div className="content">
        <h3 className="home-page-title">Diagon Alley Shop</h3>
      </div>
    </div>
    // <div className="homescreen">
    //   <image src="images/background.jpg" />
    //   <h3>Welcome, {username}</h3>

    // </div>
  );
};

export default Home;
