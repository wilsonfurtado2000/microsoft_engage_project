import React from "react";
import "./Banner.css";
import { Link } from "react-router-dom";
function Banner() {
  return (
    <div className="banner1">
      <div className="left">
        <h1>Microsoft Teams</h1>
        <h2>Meet, chat, call, and collaborate in just one place.</h2>

        <div className="btnn">
          <Link className="link_1" to="/register">
            <button className="btn2">Sign up for free</button>
          </Link>

          <Link className="link_1" to="/login">
            <button className="btn3">Sign in</button>
          </Link>
        </div>
        <p>See plans and pricing </p>
      </div>
      <div className="right">
        <img
          src="https://www.microsoft.com/en/microsoft-365/blog/wp-content/uploads/sites/12/2020/03/Teams-turns-three-banner.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default Banner;
