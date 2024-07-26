const User = require("../modals/userSchema");

const allUsers = {};

function socketHandle(io) {

  // io = socketIO(server);

  // make connection with user from server side
  io.on("connection", (socket) => {
    const userid = socket.id;
    let username = "";

    // Registering new User
    socket.on("register", async(newusername) => {
      username = newusername;
      allUsers[username] = userid;

      console.log(`[+] ${username} / ${userid}  Connected`);

      //Tell other users new user joined
      socket.broadcast.emit(
        "updateUser",
        Object.keys(allUsers),
        `${username} Connected to Server !`
      );
      
      // Send Old Messages data to new User
      const user = await User.findOne({username:username})
      if (user.messages.length)
        io.to(userid).emit("fromServer",user.messages)

      //Send new user list of already connected users
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

      try{
        // Add new message to sending user database
        const sendingUserUpdate = await User.findOneAndUpdate({username : username},{$push:{messages:newMessage}})
        
        // Add new message to receiving  user database
        const receivingUserUpdate = await User.findOneAndUpdate({ username :recipentName},{$push:{messages:newMessage}});
      
        io.to(recipentSocketId).emit("fromServer", [newMessage]);
      }  
      catch(err){
        console.log("[-] Error while Sending Message  : "+err)
      }
    });

    // when server disconnects from user
    socket.on("disconnect", () => {
      console.log("[-] Disconnected from " + username);
      delete allUsers[username];

      // Tell other users  user disconnected
      socket.broadcast.emit(
        "updateUser",
        Object.keys(allUsers),
        `[-] ${username} disconnected !`
      );
    });
  });
}

module.exports = socketHandle;
