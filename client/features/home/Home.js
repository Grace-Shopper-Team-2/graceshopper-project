import React from "react";
import { useSelector } from "react-redux";

/**
 * COMPONENT
 */

const Home = () => {
  // const username = useSelector((state) => state.auth.me.username);

  return (
    <div className="home-section">
      <div className="home-content">
        <h1 className="home-page-title">Diagon Alley Shop</h1>
        <br />
        <p>Your online source for all your witch and wizard needs</p>
      </div>
    </div>
  );
};

export default Home;
