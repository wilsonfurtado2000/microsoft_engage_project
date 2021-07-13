import React from "react";
import "./Meet.css";
import DragIndicatorOutlinedIcon from "@material-ui/icons/DragIndicatorOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import PeopleOutlineOutlinedIcon from "@material-ui/icons/PeopleOutlineOutlined";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";
import AppsIcon from "@material-ui/icons/Apps";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "./features/userSlice";
import { auth } from "./firebase";
import Room from "./Room";
function Meet() {
  const [msg2, setMsg2] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const logout1 = () => {
    dispatch(logout()); //dispatch logout action

    auth.signOut(); //signOut API  in firebase
    history.push("/");
  };

  return (
    <div className="meet">
      <div className="meet_top">
        <div className="header1">
          <div className="left_2">
            <DragIndicatorOutlinedIcon />
            <DragIndicatorOutlinedIcon className="icon_l" />
          </div>
          <div className="left_mid">
            <h2>Microsoft Teams</h2>
          </div>
          <div className="mid_21">
            <SearchOutlinedIcon className="ic_21" />
            <input
              value={msg2}
              onChange={(e) => setMsg2(e.target.value)}
              className="i_p1"
              placeholder="Search for messages"
            ></input>
          </div>
          <div className="right_2">
            <MoreHorizOutlinedIcon className="r_i" />

            <Avatar onClick={logout1} className="r_i_1"></Avatar>
          </div>
        </div>
      </div>
      <div className="meet_bottom">
        <div className="left_b1">
          <div className="left_bod1">
            <NotificationsNoneOutlinedIcon className="l_i1" />
            <p>Activity</p>
            <ChatOutlinedIcon className="l_i1" />
            <p>Chat</p>
            <PeopleOutlineOutlinedIcon className="l_i1" />
            <p>Teams</p>
            <AssignmentTurnedInOutlinedIcon className="l_i1" />
            <p>Assignments</p>
            <DateRangeOutlinedIcon className="l_i1" />
            <p>Calender</p>
            <PhoneOutlinedIcon className="l_i1" />
            <p>Calls</p>
            <MoreHorizOutlinedIcon className="l_i1" />
          </div>
          <div className="empty_31" />
          <div className="bottom_bod1">
            <AppsIcon className="l_i1" />
            <p>Apps</p>
            <HelpOutlineIcon className="l_i1" />
            <p>Help</p>
          </div>
        </div>
        <Room mess={msg2} />
      </div>
    </div>
  );
}

export default Meet;
