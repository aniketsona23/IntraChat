const socketIO = require("socket.io");
const mongoose = require("mongoose");
const User = require("../modals/userSchema");
let allUsers = {};
const d = new Date();

function socketHandle(server) {
  io = socketIO(server);
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

      socket.emit(
        "updateUser",
        Object.keys(allUsers),
        "Welcome to IntraChat !"
      );
    });

    // listen for message from user
    socket.on("fromUser", async (newMessage) => {
      const recipentName = newMessage.to;
      const recipentSocketId = allUsers[recipentName];
      let user2toUpdate = await User.findOne({username:newMessage.from})
      user2toUpdate.messages.fromMe.push({
        to: newMessage.to,
        msg: newMessage.msg,
        time: d.getTime(),
      })
      let user1toUpdate = await User.findOne({ username: recipentName });
      user1toUpdate.messages.toMe.push({
        from: newMessage.from,
        msg: newMessage.msg,
        time: d.getTime(),
      });
      const re1 = await User.updateOne({username:recipentName},user1toUpdate)
      const re2 = await User.updateOne({username:newMessage.from},user2toUpdate)
      console.log(re1,re2)
      io.to(recipentSocketId).emit("fromServer", newMessage);
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
}

module.exports = socketHandle;
