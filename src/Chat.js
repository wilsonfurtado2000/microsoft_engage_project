import React, { useState } from "react";
import io from "socket.io-client";
import { useEffect } from "react";
import "./Room.css";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import "./Chat.css";
import { room } from "./TeamLeft";
import db from "./firebase";
import { peerId } from "./Room";

const ENDPOINT = "https://microsoft-teams123.herokuapp.com";

const socket = io.connect(ENDPOINT);

function Chat({ isClick, inp }) {
  const user = useSelector(selectUser); //getting the user information
  const name = user.email;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  //on hitting enter key this code fires off
  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("teams").doc(room).collection("messages").add({
      // adding the messages in databse
      message: input,
      name: name,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  useEffect(() => {
    //listens only once to prevent it from firing multiple times
    socket.once("server-message", (data) => {
      if (peerId !== data.peerId) {
        if (data.message !== "") {
          db.collection("teams").doc(room).collection("messages").add({
            //adding messages in the database
            message: data.message, //which we recieve from the server
            name: data.name,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
        }
      }
    });

    //emiiting the messages we just entered to the server
    socket.emit("chat-message", input, room, peerId);

    db.collection("teams") //getting the messages from firebase
      .doc(room)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMessages(
          //adding all the messgaes in the array
          snapshot.docs.map((doc) => ({
            msg: doc.data(),
            id: doc.id,
          }))
        )
      );
  }, []);

  return (
    <div className="chat">
      <div className="mrrr_11">
        <h3>Chat</h3>
      </div>
      <div className={`mrrr_21 ${isClick === true && "mrrr_212"}`}>
        {messages
          .filter((data) => {
            if (inp === "") {
              return data;
            } else if (
              data.msg.message.toLowerCase().includes(inp.toLowerCase())
            ) {
              return data;
            }
          })
          .map(({ msg, id }) => {
            return (
              <div className={`message ${msg.name === name && "reciver2"}`}>
                <span className="name1">
                  {msg.name.substr(0, msg.name.length - 10)}
                </span>
                <p className="msg">{msg.message}</p>
                <span className="time">
                  {new Date(msg.timestamp?.toDate()).toUTCString()}
                </span>
              </div>
            );
          })}
      </div>

      <div className="mrrr_31">
        <form>
          <input
            className="chat_input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="type a message"
            type="text"
          ></input>
          <button onClick={sendMessage} type="submit">
            {" "}
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
