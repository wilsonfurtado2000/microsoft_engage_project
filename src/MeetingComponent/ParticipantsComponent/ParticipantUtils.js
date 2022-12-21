import React from "react";
import "./ParticipantUtils.css";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";

function ParticipantUtils({ name }) {
  // recieving props

  const useStyles = makeStyles((theme) => ({
    //to give the styling for the avatar from material UI
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
  }));

  const classes = useStyles();
  return (
    <div className="utils">
      <div className="part_util">
        <Avatar className={classes.orange}>{name[0].toUpperCase()}</Avatar>
        <p className="part_name">{name}</p>
      </div>
    </div>
  );
}

export default ParticipantUtils;
