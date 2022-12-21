import React, { useState } from "react";
import "./Main.css";
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
import { Input } from "@material-ui/core";
import Card from "./Card";
import { useEffect } from "react";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import Avatar from "@material-ui/core/Avatar";
import { useDispatch } from "react-redux";
import { logout } from "../features/userSlice";
import { useHistory, withRouter } from "react-router-dom";
import db, { auth } from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

function getModalStyle() {
  //function to implement modal to add team functionality
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Main() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [name2, setName2] = useState([]);
  const classes = useStyles();
  const [teams, setTeams] = useState([]);
  const [modalStyle] = React.useState(getModalStyle);
  const history = useHistory();
  const dispatch = useDispatch();

  const logout1 = () => {
    dispatch(logout()); //dispatch logout action in the store

    auth.signOut(); //singnOut from firebase
    history.push("/");
  };

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("navigationhandler")); //to prevent the user from going back
  }, []);

  useEffect(() => {
    db.collection("teams").onSnapshot(
      (
        snapshot //set the teams array
      ) =>
        setTeams(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
    );
  }, []);

  //function to close the modal
  const handleClose = () => {
    setOpen(false);
  };

  const addTeam = () => {
    db.collection("teams").add({
      //pushing team info into the database
      team_name: name2,
    });
    setOpen(false);
    setName2("");
  };

  return (
    <div className="main">
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <div className="modal">
            <h2>Enter Your Team details</h2>
            <Input
              className="input_room"
              placeholder="Team name"
              type="text"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
            />
            <button onClick={addTeam} className="button_main">
              Create{" "}
            </button>
          </div>
        </div>
      </Modal>

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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="i_p"
            placeholder="Search  team"
          ></input>
        </div>
        <div className="right_2">
          <MoreHorizOutlinedIcon className="r_i" />
          <Avatar onClick={logout1} className="r_i_1"></Avatar>
        </div>
      </div>
      <div className="body">
        <div className="left_b">
          <div className="left_bod">
            <NotificationsNoneOutlinedIcon className="l_i" />
            <p>Activity</p>
            <ChatOutlinedIcon className="l_i" />
            <p>Chat</p>
            <PeopleOutlineOutlinedIcon className="l_i" />
            <p>Teams</p>
            <AssignmentTurnedInOutlinedIcon className="l_i" />
            <p>Assignments</p>
            <DateRangeOutlinedIcon className="l_i" />
            <p>Calender</p>
            <PhoneOutlinedIcon className="l_i" />
            <p>Calls</p>
            <MoreHorizOutlinedIcon className="l_i" />
          </div>
          <div className="empty_3" />
          <div className="bottom_bod">
            <AppsIcon className="l_i" />
            <p>Apps</p>
            <HelpOutlineIcon className="l_i" />
            <p>Help</p>
          </div>
        </div>

        <div className="right_bod">
          <div className="right_bod_top">
            <div className="ri_l">
              <h3>Teams</h3>
            </div>
            <div className="ri_r">
              <SettingsOutlinedIcon className="ic_r" />
              <div className="ri_r_info" onClick={() => setOpen(true)}>
                <PeopleOutlineOutlinedIcon className="ic_m" />
                <h3>Create Team</h3>
              </div>
            </div>
          </div>
          <h4 className="text_ii">Your teams </h4>
          <div className="right_bod_bottom">
            {teams
              .filter((data) => {
                if (search === "") {
                  return data;
                } else if (
                  data.data.team_name
                    .toLowerCase()
                    .includes(search.toLowerCase())
                ) {
                  return data;
                }
              })
              .map(({ id, data }) => (
                <Card key={id} id={id} teamName={data.team_name} /> //redering teams by passing props
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Main);
