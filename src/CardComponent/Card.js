import React from "react";
import "./Card.css";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, green } from "@material-ui/core/colors";

//modal styles to implement the pop window in our app
const useStyles = makeStyles((theme) => ({
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
  },
  rounded: {
    color: "#fff",
    backgroundColor: green[500],
  },
}));

function Card({ id, teamName }) {
  const history = useHistory();
  const classes = useStyles();

  const redirect = () => {
    history.push("/team");
  };

  return (
    <div className="card">
      <div className="card_info">
        <Link className="link_1" to={`/team/teamId=${id}`}>
          <div className="card_bottom">
            <MoreHorizIcon className="ic_c" />
            <Avatar
              className="avatar_card"
              variant="sqaure"
              className={classes.square}
            >
              {teamName.substr(0, 2).toUpperCase()}
            </Avatar>
            <h1 onClick={redirect}>{teamName}</h1>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Card;
