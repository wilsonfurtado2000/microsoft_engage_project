/** built the group chat feature using agile */

import React, { useState } from "react";
import VideocamOutlinedIcon from "@material-ui/icons/VideocamOutlined";
import VideocamOffOutlinedIcon from "@material-ui/icons/VideocamOffOutlined";
import MicNoneOutlinedIcon from "@material-ui/icons/MicNoneOutlined";
import MicOffOutlinedIcon from "@material-ui/icons/MicOffOutlined";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import CallEndOutlinedIcon from "@material-ui/icons/CallEndOutlined";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import ParticipantUtils from "./ParticipantUtils";
import io from "socket.io-client";
import Peer from "peerjs";
import { useEffect, useRef } from "react";
import "./Room.css";
import axios from "./axios";
import { useReactMediaRecorder } from "react-media-recorder";
import { selectUser } from "./features/userSlice";
import db from "./firebase";
import Chat from "./Chat2";
import { useSelector } from "react-redux";
import { room } from "./TeamLeft";
import { getTurnServers, setTurnServers } from "./TURN";

const ENDPOINT = "https://microsoft-teams123.herokuapp.com";

const socket = io.connect(ENDPOINT); //connect to the socket server
let peerId;

function Room({ mess }) {
  //usStates to manage the states
  const user = useSelector(selectUser); //getting user info from the store
  const [stream, setStream] = useState();
  const myVideoStream = useRef(null);
  const [id, setId] = useState("");
  const [mute, setMute] = useState(false);
  const [stopPlay, setStopPlay] = useState(false);
  const [click, setClick] = useState(false);
  const videoGrid = useRef(null);
  const [chat, setChat] = useState(false);
  const [participant, setParticipant] = useState(false);
  const [header, setHeader] = useState(false);
  const [view, setView] = useState(false);
  const [users, setUsers] = useState([]);
  const [end, setEnd] = useState(false);

  //package for recording
  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(
    { video: true }
  );

  const peers = {}; // store the peers

  const name = user.email;
  var localUserId;

  useEffect(() => {
    db.collection("teams").doc(room).collection("users").add({
      //add the users in the databse
      userName: name, //when the user clicks on meet button in team dashboard
    });
  }, []);

  useEffect(() => {
    //setting the users on page load
    db.collection("teams")
      .doc(room)
      .collection("users")
      .onSnapshot((snapshot) =>
        setUsers(
          snapshot.docs.map((doc) => ({
            userss: doc.data(),
            id: doc.id,
          }))
        )
      );
  }, []);

  //getting the TURN servers from backend
  useEffect(() => {
    axios.get("/api-token").then((res) => {
      console.log(res);
      setTurnServers(res.data.token.iceServers);
    });
  }, []);

  //mapping in the array to get the id of the localUser from the database
  users.map(({ userss, id }) => {
    if (name === userss.userName) {
      localUserId = id;
    }
  });

  //end call functionality
  const endCall = (id) => {
    if (!end) {
      setEnd(true);
    }

    db.collection("teams").doc(room).collection("users").doc(id).delete(); //deleting the user id from the database

    socket.on("user-diconnected", (userId) => {
      if (peers[userId]) peers[userId].close(); //close the peer connection on end call
    });
    window.location = `/team/teamId=${room}`; //redirect user
  };

  // to fetch the roomId from the server
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

  /** socket.on() attach the new listner  for the given event */
  /** socket.emit() send the event to the server  */

  useEffect(() => {
    //creating a new peer

    /** in the following code agile is used to implement group call functionality
     * previously only 2 people could communicate
     */
    const peer = new Peer(undefined, {
      port: "443",
      config: {
        //to set up TURN/STUN servers so that people from different networks connect to each other
        iceServers: [
          ...getTurnServers(), // calling the method from './TURN' to get turn servers
          {
            url: "turn:numb.viagenie.ca",
            credential: "muazkh",
            username: "webrtc@live.com",
          },
          {
            url: "turn:relay.backups.cz?transport=tcp",
            credential: "webrtc",
            username: "webrtc",
          },
          {
            url: "stun:stun.1und1.de.3478",
          },
          {
            url: "stun:stun.l.google.com:19302",
          },
        ],
      },
    });

    //Every Peer object is assigned a random, unique ID when it's created.
    peer.on("open", (id1) => {
      //when the peer connection is setUp
      socket.emit("join-room", id, id1, name); //join the room with roomId,peerId,name respectivly
    });

    //function to add the video to the grid of videos
    const addVideoStream = (video, stream) => {
      video.srcObject = stream;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
      videoGrid.current.appendChild(video);
    };

    //to connect to the user
    const connectToUser = (userId, stream) => {
      // /Call another peer by calling peer.call with the peer ID of the destination peer.
      // When a peer calls you, the call event is emitted.
      //When calling or answering a call, a MediaStream should be provided.
      //The MediaStream represents the local video (webcam) or audio stream
      const call = peer.call(userId, stream); //call the peer
      const video = document.createElement("video");
      video.setAttribute("class", `pointer`);

      video.addEventListener("click", () => {
        console.log(video);
      });

      //Set listeners for peer events.
      call.on("stream", function (userStream) {
        //on accpeting add the peer stream to our stream
        addVideoStream(video, userStream);
      });

      //when the peer disconnects remove the video from our grid of videos
      //Emitted when the peer is destroyed and can no longer accept or create any new connections.
      // At this time, the peer's connections will all be closed.
      call.on("close", () => {
        video.parentNode.removeChild(video);
      });

      peers[userId] = call; //storing the details in the array
    };

    navigator.mediaDevices //used to get our video and audio
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        //recieve a stream
        peerId = stream.id;
        setStream(stream); // set our stream

        myVideoStream.current.srcObject = stream;

        peer.on("call", (call) => {
          call.answer(stream); //answer the call
          const video = document.createElement("video");

          // send our stream to other peers connected
          call.on("stream", function (userStream) {
            addVideoStream(video, userStream);
          });
        });

        //fires off when user connects
        socket.on("user-connected", (userId) => {
          connectToUser(userId, stream);
        });
      });

    //when user disconnects
    socket.on("user-disconnected", (userId) => {
      if (peers[userId]) peers[userId].close(); //close the connection
    });
  }, []);

  //  mute/unmute our audio
  const muteAudio = () => {
    const enable = stream.getAudioTracks()[0].enabled;
    if (enable) {
      stream.getAudioTracks()[0].enabled = false;
      setMute(true);
    } else {
      stream.getAudioTracks()[0].enabled = true;
      setMute(false);
    }
  };

  // video toggle function
  const play = () => {
    const enable = stream.getVideoTracks()[0].enabled;
    if (enable) {
      stream.getVideoTracks()[0].enabled = false;

      setStopPlay(true);
    } else {
      stream.getVideoTracks()[0].enabled = true;
      setStopPlay(false);
    }
  };

  //download recorded video
  const download = () => {
    const blob = new Blob([mediaBlobUrl], {
      type: "video/webm",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "webrtc_record.webm";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  };

  //when user clicks on record this runs
  const setOnRecord = () => {
    if (!click) {
      setClick(true);
    } else {
      setClick(false);
    }
  };

  //display participant box
  const setOnParticipant = () => {
    if (!participant) {
      setParticipant(true);
      setChat(false);
    } else {
      setParticipant(false);
      setChat(true);
    }
  };

  //display chat box
  const setOnChat = () => {
    if (!chat) {
      setChat(true);
      setParticipant(false);
    } else {
      setChat(false);
      setParticipant(true);
    }
  };

  //stop the preview of our recorded video
  const setStopRecord = () => {
    if (!header) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };

  //fires when user clicks on view recording button
  const setOnView = () => {
    if (!view) {
      setView(true);
    } else {
      setView(false);
    }
  };

  return (
    <div className="room">
      <div className="room_meet">
        {click ? (
          <div className="room_control">
            <h3>Recording has started</h3>
            {header ? (
              <>
                <button className="view_button" onClick={download}>
                  Download Recording
                </button>
                <button className="view_button" onClick={setOnView}>
                  View Recording
                </button>
                <button className="view_button" onClick={setOnView}>
                  Stop preview
                </button>
              </>
            ) : (
              <>
                <button
                  className="view_button_1"
                  onClick={() => {
                    stopRecording();
                    setStopRecord();
                  }}
                >
                  Stop recording
                </button>
                <button
                  className="view_button"
                  disabled="disabled"
                  onClick={download}
                >
                  Download Recording
                </button>
                <button
                  className="view_button"
                  disabled="disabled"
                  onClick={setOnView}
                >
                  View Recording
                </button>
                <button
                  className="view_button"
                  disabled="disabled"
                  onClick={setOnView}
                >
                  Stop preview
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="empty_meet" />
        )}
        <div className="room_stream">
          <div className="video_stream">
            <video
              ref={myVideoStream}
              muted
              className="remote_stream"
              autoPlay
            />
            <div ref={videoGrid} className="local_stream"></div>
          </div>

          {users.map(({ userss, id }) => {
            if (name === userss.userName) {
              localUserId = id;
            }
          })}
          <div className="mrr_l">
            {!mute ? (
              <MicNoneOutlinedIcon className="mrr_l1" onClick={muteAudio} />
            ) : (
              <MicOffOutlinedIcon className="mrr_l1" onClick={muteAudio} />
            )}
            {!stopPlay ? (
              <VideocamOutlinedIcon className="mrr_l1" onClick={play} />
            ) : (
              <VideocamOffOutlinedIcon className="mrr_l1" onClick={play} />
            )}
            <div className="tooltip_1">
              <div className="tooltip">record</div>
              <FiberManualRecordIcon
                className="mrr_l121"
                onClick={() => {
                  startRecording();
                  setOnRecord();
                }}
              />
            </div>

            <ChatOutlinedIcon onClick={setOnChat} className="mrr_l1" />

            <GroupOutlinedIcon onClick={setOnParticipant} className="mrr_l1" />

            <CallEndOutlinedIcon
              className="mrr_l12"
              onClick={() => endCall(localUserId)}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
      <div className="meet_right_right_right">
        {!view ? (
          <div className="empty_meet" />
        ) : (
          <video
            className="view_recording"
            src={mediaBlobUrl}
            controls
            autoplay
            loop
          />
        )}
        {!participant && chat ? (
          <Chat mess={mess} />
        ) : (
          <div className="participant">
            <div className="part_head">
              <h1 className="part_head_1">Participants</h1>
            </div>
            <div className="part_1">
              {users.map(({ id, userss }) => {
                return (
                  <ParticipantUtils
                    className="participant_list"
                    key={id}
                    name={userss.userName}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export { peerId };
export default Room;
