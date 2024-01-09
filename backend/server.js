require("dotenv").config();

const bodyParser = require("body-parser"); // Middleware

const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const path = require("path");
const mognoose = require("mongoose");
const { default: mongoose } = require("mongoose");
const User = require("./modals/userSchema");
const port = process.env.PORT || 3000;

let app = express();
app.use(express.static(path.join(__dirname, "/frontend")));
app.use(bodyParser.urlencoded({ extended: false }));

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

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("[+] Connected to Database.");

    server.listen(port, () => {
      console.log(`Server started on http://localhost:${port}/\n`);
    });
  })
  .catch((err) => {
    console.log("[-] Error : " + err);
  });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/login.html"));
});

// app.post("/", async (req, res) => {
//   const userdata = await User.find({});
//   console.log(userdata);
//   const { username, password } = req.body;
//   res.redirect(`/user/${username}/password/${password}`);
// });

// app.get("/user/:username", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/client.html"));
// });
