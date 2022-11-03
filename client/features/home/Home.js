import React from "react";
import { useSelector } from "react-redux";
// import image from ".../"
// import image from "../";

/**
 * COMPONENT
 */

const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div className="home-section">
      <section>
        <div className="home-content">
          <h1 className="home-page-title">Diagon Alley Shop</h1>
          <br />
          <p>Your online source for all your witch and wizard needs</p>
        </div>
      </section>

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
