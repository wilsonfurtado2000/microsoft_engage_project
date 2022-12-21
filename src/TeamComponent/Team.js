import React, { useState } from "react";
import "./Team.css";
import { TeamLeft } from "./TeamLeft";
import TeamRight from "./TeamRight";
import DragIndicatorOutlinedIcon from "@material-ui/icons/DragIndicatorOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import Avatar from "@material-ui/core/Avatar";
import { useDispatch } from "react-redux";
import { logout } from "../features/userSlice";
import "./Main.css";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";

function Team() {
  const [msg, setMsg] = useState("");
  const history = useHistory();

  const dispatch = useDispatch();

  const logout1 = () => {
    dispatch(logout()); //dispatch logout action in  the store
    auth.signOut();
    history.push("/");
  };

  return (
    <div className="team">
      <div className="header">
        <div className="left_2">
          <DragIndicatorOutlinedIcon />
          <DragIndicatorOutlinedIcon className="icon_l" />
        </div>
        <div className="left_mid">
          <h2>Microsoft Teams</h2>
        </div>
        <div className="mid_2">
          <SearchOutlinedIcon className="ic_2" />
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="i_p"
            placeholder="Search for messages"
          ></input>
        </div>
        <div className="right_2">
          <MoreHorizOutlinedIcon className="r_i" />

          <Avatar onClick={logout1} className="r_i_1"></Avatar>
        </div>
      </div>
      <div className="team_view">
        <div className="left_view">
          <TeamLeft />
        </div>

        <div className="right_view">
          <TeamRight inp={msg} />
        </div>
      </div>
    </div>
  );
}

export default Team;
