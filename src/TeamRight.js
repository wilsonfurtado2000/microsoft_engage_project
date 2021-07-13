import React, { useEffect, useState } from "react";
import "./TeamRight.css";
import AddIcon from "@material-ui/icons/Add";
import VideocamOutlinedIcon from "@material-ui/icons/VideocamOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import axios from "./axios";
import { Input } from "@material-ui/core";
import InsertInvitationOutlinedIcon from "@material-ui/icons/InsertInvitationOutlined";
import { room } from "./TeamLeft";
import Chat from "./Chat";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
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

function TeamRight({ inp }) {
  const [id, setId] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [open, setOpen] = useState(false);
  const [email2, setEmail2] = useState("");
  const [name2, setName2] = useState([]);
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [click, setClick] = useState(false);
  const user = useSelector(selectUser);

  //  //function to close the modal
  const handleClose = () => {
    setOpen(false);
  };

  const URL = window.location.href; //getting the window URL
  const name = user.email;

  const liink = "https://fir-5e7f3.web.app";

  // to send the team invite through mail
  const invite = () => {
    window.Email.send({
      Host: "smtp.gmail.com",
      Username: "wilsonfurtado2000@gmail.com",
      Password: "vnudjntznylbjqfa",
      To: name2,
      From: name,
      Subject: "Meet Invite Link",
      Body: `if you are not signed in , click on  ${liink} to signIn <br />
           team invite link  : ${URL} <br />
            click on "meet" on top right corner of your window to join the meet `,
    }).then((message) => console.log(message));

    setOpen(false);
    setEmail2("");
    setName2("");
  };

  //to get the roomId from the server
  useEffect(() => {
    const fetchId = async () =>
      await axios
        .get("/")
        .then((response) => {
          setId(response.data);
        })
        .catch((err) => {
          console.log(err.message);
        });

    fetchId();
  }, []);

  const history = useHistory();
  const p = () => {
    setClick(true);
    history.push(`/team/teamId=${room}/meetingId=${id}/meet`);
  };

  //when you click on chat this runs
  const openChat = () => {
    if (!open) {
      setOpen1(true);
    } else {
      setOpen1(false);
    }
  };

  return (
    <div className="team_right">
      <div>
        <Modal open={open} onClose={handleClose}>
          <div style={modalStyle} className={classes.paper}>
            <div className="modal">
              <h2>Invite people to join your team</h2>

              <div className="invite_1">
                <Input
                  className="input_room"
                  placeholder="Enter email"
                  type="email"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                />
                <Input
                  className="input_room"
                  type="text"
                  value={URL}
                  onChange={(e) => setEmail2(e.target.value)}
                />
              </div>
              <button onClick={invite} className="button_main_1">
                Invite via email{" "}
              </button>
            </div>
          </div>
        </Modal>
      </div>
      <div className="team_right_right">
        <div className="team_right_right_left">
          <h1>General</h1>
          <h4 className="chat_team" onClick={openChat}>
            Chat
          </h4>

          <AddIcon className="trrl" />
        </div>
        <div className="team_right_right_right">
          <div className="meet_start" onClick={p}>
            <VideocamOutlinedIcon />
            <p className="ms_1">Meet</p>
          </div>
          <div className="meet_start" onClick={() => setOpen(true)}>
            <InsertInvitationOutlinedIcon />
            <p className="ms_1">Invite</p>
          </div>
          <div className="meet_end">
            <InfoOutlinedIcon className="me" />
            <MoreHorizOutlinedIcon className="me_1" />
          </div>
        </div>
      </div>
      {!open1 ? (
        <div className="team_right_body">
          <div className="trb_info">
            <h1>Welcome to the team!</h1>
            <h3>Here are some things to get going...</h3>
          </div>
          <div className="trb_img">
            <img
              className="trb_img1"
              src="https://www.curatrix.co.uk/wp-content/uploads/2020/06/How-to-setup-a-Microsoft-Teams-meeting.png"
              alt=""
            />
            <img
              className="trb_img2"
              src="https://cdn.mos.cms.futurecdn.net/9MZGCpvyGjuLKzAeyMd6hh-480-80.jpg"
              alt=""
            />
          </div>
          <div className="trb_button">
            <h3 className="trb_bb1">Create more channels</h3>
            <h3 className="trb_bb2">Open the FAQ</h3>
          </div>
        </div>
      ) : (
        <Chat inp={inp} />
      )}
    </div>
  );
}

export default TeamRight;
