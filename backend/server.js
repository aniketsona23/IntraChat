const express=require('express');
const socketIO=require('socket.io');
const http=require('http')
const port=process.env.PORT||3000
const path = require("path")

var app=express();
let server = http.createServer(app);
var io=socketIO(server);

app.use(express.static(path.join(__dirname,"../frontend")))

let users ={}


// make connection with user from server side
io.on('connection', (socket)=>{
  let userid = socket.id

  socket.on("register",(user)=>{
    
    user.id = userid
    users[user.name]=userid
    console.log(`${user.name} / ${userid}  Connected`)
    
    socket.emit("register",user);
    socket.broadcast.emit("updateUser",[users,`${user.name}/ ${userid} Connected to Server !`])

    console.log(users)
  })

  // listen for message from user
  socket.on('fromUser', (newMessage)=>{
    const recipent  = newMessage.to.name
    const recipentId = users[recipent]

    console.log(users)
    io.to(recipentId).emit("fromServer",newMessage)
    console.log( `${newMessage.from.name} : ${newMessage.msg}`);
  });
  

  // when server disconnects from user
  socket.on('disconnect', ()=>{
  	console.log('disconnected from '+users.userid);
  });
  
});

app.get("/client1", (req, res) => {
  res.sendFile(path.join(__dirname,"../frontend/client1.html"));
});

app.get("/client2", (req, res) => {
  res.sendFile(path.join(__dirname,"../frontend/client2.html"));
});

app.get("/client3", (req, res) => {
  res.sendFile(path.join(__dirname,"../frontend/client3.html"));
});

server.listen(port,()=>{
  console.log("Server started on http://localhost:"+port)
});
