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
      <section className="about-us">
        <div class="container">
          <div class="row">
            <div class="col"></div>
            <image></image>
          </div>
        </div>
      </section>
    </div>
    // <div className="homescreen">
    //   <image src="images/background.jpg" />
    //   <h3>Welcome, {username}</h3>

    // </div>
  );
};

export default Home;
