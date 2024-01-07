const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const path = require("path");

const port = process.env.PORT || 3000;
let app = express();
app.use(express.static(path.join(__dirname, "../frontend")));

let server = http.createServer(app);
let io = socketIO(server);

let allUsers = {};

// make connection with user from server side
io.on("connection", (socket) => {
  const userid = socket.id;
  let username = "";

  // Registering new User
  socket.on("register", (newusername) => {
    username = newusername;
    allUsers[username] = userid;

    console.log(`[+] ${username} / ${userid}  Connected`);

    //Tell other users new user joined
    socket.broadcast.emit(
      "updateUser",
      Object.keys(allUsers),
      `${username} Connected to Server !`
    );

    socket.emit("updateUser", Object.keys(allUsers), "Welcome to IntraChat !");
  });

  // listen for message from user
  socket.on("fromUser", (newMessage) => {
    const recipentName = newMessage.to;
    const recipentId = allUsers[recipentName];

    io.to(recipentId).emit("fromServer", newMessage);
  });

  // when server disconnects from user
  socket.on("disconnect", () => {
    console.log("disconnected from " + username);
    delete allUsers[username];

    // Tell other users  user disconnected
    socket.broadcast.emit(
      "updateUser",
      Object.keys(allUsers),
      `${username} disconnected !`
    );
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

server.listen(port, () => {
  console.log(`Server started on http://localhost:${port}\n`);
});
