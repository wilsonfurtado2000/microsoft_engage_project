import React from "react";
import "./Header.css";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header2">
      <div className="imgggs">
        <img
          src="https://www.custompcreview.com/wp-content/uploads/2016/07/microsoft-logo.jpg"
          alt=""
        />
      </div>

      <h3 className="t">Teams</h3>
      <div className="header_info">
        <h3 className="h_p">Products</h3>
        <KeyboardArrowDownIcon className="drop" />
        <h3 className="h_p">Solutions</h3>
        <KeyboardArrowDownIcon className="drop" />
        <h3 className="h_p">Resources</h3>
        <KeyboardArrowDownIcon className="drop" />
        <h3 className="h_p">Pricing</h3>
        <h3 className="h_p">More Mcrosoft 365</h3>
      </div>
      <div className="side_info">
        <p>Download Teams</p>
        <div className="btn_p">
          <Link className="link_1" to="/register">
            <button className="btn">Sign up for free</button>
          </Link>
        </div>
        <Link to="/login">
          <AccountCircleOutlinedIcon className="avatar" />
        </Link>
      </div>
    </div>
  );
}

export default Header;
