import React from "react";
import "./Footer2.css";
import CopyrightOutlinedIcon from "@material-ui/icons/CopyrightOutlined";
import LanguageOutlinedIcon from "@material-ui/icons/LanguageOutlined";
function Footer2() {
  return (
    <div className="foot2">
      <div className="left_2">
        <LanguageOutlinedIcon className="ic_2" />
        <p>English (india)</p>
      </div>
      <div className="right_2">
        <p>Contact Microsoft</p>
        <p>Privacy</p>
        <p>Terms of use</p>
        <p>Trademarks</p>
        <p>About out ads</p>
        <CopyrightOutlinedIcon className="ic" /> <p>Mcrosoft 2021</p>
      </div>
    </div>
  );
}

export default Footer2;
