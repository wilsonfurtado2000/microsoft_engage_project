import React, { useState, useEffect } from "react";
import "./TeamLeft.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import PeopleOutlineOutlinedIcon from "@material-ui/icons/PeopleOutlineOutlined";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import AppsIcon from "@material-ui/icons/Apps";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import db from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  //modal
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  square: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    height: "90px",
    width: "90px",
    fontSize: "30px",
    marginTop: "15px",
    marginBottom: "10px",
  },
  rounded: {
    color: "#fff",
    backgroundColor: green[500],
  },
}));

let room;

function TeamLeft() {
  const { roomId } = useParams(); //get teamId from the URL parameter
  const history = useHistory();
  const classes = useStyles();
  const [roomName, setRoomName] = useState("");

  const prev = () => {
    history.push("/main");
  };

  room = roomId; //teamId

  //runs everytime when teamId changes to pull new info from the database

  useEffect(() => {
    if (roomId) {
      db.collection("teams")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().team_name));
    }
  }, [roomId]);

  return (
    <div className="team_left">
      <div className="left_b2">
        <div className="left_bod2">
          <NotificationsNoneOutlinedIcon className="l_i2" />
          <p>Activity</p>
          <ChatOutlinedIcon className="l_i2" />
          <p>Chat</p>
          <PeopleOutlineOutlinedIcon className="l_i2" />
          <p>Teams</p>
          <AssignmentTurnedInOutlinedIcon className="l_i2" />
          <p>Assignments</p>
          <DateRangeOutlinedIcon className="l_i2" />
          <p>Calender</p>
          <PhoneOutlinedIcon className="l_i2" />
          <p>Calls</p>
          <MoreHorizOutlinedIcon className="l_i2" />
        </div>
        <div className="empty_32" />
        <div className="bottom_bod2">
          <AppsIcon className="l_i2" />
          <p>Apps</p>
          <HelpOutlineIcon className="l_i2" />
          <p>Help</p>
        </div>
      </div>

      <div className="team_left_right">
        <div className="team_top">
          <ArrowBackIosIcon className="drop" onClick={prev} />
          <p onClick={prev}>All teams</p>
        </div>
        <Avatar variant="square" className={classes.square}>
          {roomName.substr(0, 2).toUpperCase()}
        </Avatar>
        <div className="team_bot">
          <h3>{roomName}</h3>
          <MoreHorizIcon className="drop1" />
        </div>
        <div className="team_bot_bot">
          <p>General</p>
        </div>
      </div>
    </div>
  );
}

export { TeamLeft };
export { room };
