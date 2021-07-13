import React from "react";
import "./PreLogin.css";
import Header from "./Header";
import KeyboardArrowRightOutlinedIcon from "@material-ui/icons/KeyboardArrowRightOutlined";
import Banner from "./Banner";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import EditLocationOutlinedIcon from "@material-ui/icons/EditLocationOutlined";
import TwitterIcon from "@material-ui/icons/Twitter";
import Footer from "./Foot";
import Footer2 from "./Footer2";

function PreLogin() {
  return (
    <div className="pre_login">
      <div className="header">
        <Header />
      </div>
      <div className="empty">
        <h3>
          Now use Microsoft Teams with family and friends to call, chat, and
          make plans.
        </h3>
        <p>Learn More</p>
        <KeyboardArrowRightOutlinedIcon className="ava" />
      </div>
      <div className="banner">
        <Banner />
      </div>
      <div className="empty1" />
      <div className="footer1">
        <p>Follow Microsoft 365</p>
        <div className="icon">
          <LinkedInIcon className="icon_left" />
          <TwitterIcon className="icon_mid" />
          <EditLocationOutlinedIcon className="icon_right" />
        </div>
      </div>

      <Footer />
      <div className="footer_2">
        <Footer2 />
      </div>
    </div>
  );
}

export default PreLogin;
