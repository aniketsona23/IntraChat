const socketIO = require("socket.io");

let allUsers = {};

function socketHandle(server){

    io = socketIO(server)
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
}

module.exports = socketHandle