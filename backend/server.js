const express = require("express");
const http = require("http");
const socket = require("socket.io");
const cors = require("cors");
const twilio = require("twilio");
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 4001;

const io = socket(server, {
  //socket server
  cors: {
    origin: "*", //to prevent the cors error
    methods: ["GET", "POST"],
  },
});

let roomId = Math.floor(Math.random() * 100000000); //generates unique 8 digit Id

app.get("/", (req, res) => {
  res.send(`${roomId}`); //send the Id to the server
});

//to get the TURN servers from twilio api
app.get("/api-token", (req, res) => {
  const accountSid = "AC65e825e1cbf28e612247d9a1bb6c5663";
  const authToken = "dab00c877e59434bf09651e3501c14b3";
  const client = twilio(accountSid, authToken);

  client.tokens.create().then((token) => res.send({ token }));
});

const users = []; //store the participnats for the meet

const users2 = {}; //store  the particpants for the chat

/*  socket.on() attaches a new listner  */
/** socket.emit() sends event to this client */
/** socket.broadcast.emit() sends event to all the clients */

io.on("connection", (socket) => {
  // when user joins the mmet
  socket.on("join-room", (roomId, userId, name) => {
    users[socket.id] = name; //store in the array
    socket.join(roomId);
    console.log("user connected");
    socket.broadcast.to(roomId).emit("user-connected", userId);

    //when user disconnects
    socket.on("disconnect", () => {
      console.log("user disconnect");
      socket.broadcast.to(roomId).emit("user-disconnected", userId);
    });
  });
});

//chat functionality where i have used agile methodology
io.once("connection", (socket) => {
  //once is used to prevent multiple
  //instance of same event firing off
  //when chat is sent this runs off
  socket.on("chat-message", (message, teamName, peerId) => {
    socket.broadcast.to(teamName).emit("server-message", {
      message: message,
      name: users2[socket.id],
      peerId: peerId,
    }); // to get the messages on the client side
  });

  socket.on("disconnect", () => {
    delete users2[socket.id]; //delete the user from the array
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
