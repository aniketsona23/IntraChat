const socket = io();

const urlParams = new URLSearchParams(window.location.search);
const activeUsername = urlParams.get("username");

let otherUsersNames = [];
let usersDisplayList = [];
let messagesList = [];

const messagesDisplay = document.getElementById("messages");
const userDisplayContainer = document.getElementById("users");
const form = document.getElementById("form")

form.addEventListener("submit",(e)=>{
  e.preventDefault()
  sendMessage()
})
// function to delete all radio buttons
function deleteUserOptions() {
  usersDisplayList.forEach((element) => {
    userDisplayContainer.removeChild(element);
  });
  usersDisplayList = [];
}

// function to create radio buttons for active users
function addUserOptions(userslist) {
  userslist.forEach((user)=> {
    const tempContainer = document.createElement("div");
    const rads = document.createElement("input");
    rads.setAttribute("type", "radio");
    rads.setAttribute("name", "client");
    rads.setAttribute("id", user);
    rads.setAttribute("value", user);
    
    const labels = document.createElement("label");
    labels.setAttribute("class", "clientlabel");
    labels.setAttribute("for", user);
    labels.innerHTML = user;
    
    tempContainer.appendChild(rads);
    tempContainer.appendChild(labels);
    tempContainer.setAttribute("class", "user-radio");

    userDisplayContainer.appendChild(tempContainer);
    usersDisplayList.push(tempContainer);
  })

  userDisplayContainer.addEventListener("click",function(event){
    if(event.target.type === "radio"){
      displayChat(event.target)
    }
  })
  if (usersDisplayList.length) {
    const firstRadio = document.getElementsByName("client")[0]
    firstRadio.checked = true;// Check the first radio button
    displayChat(firstRadio)
  }
}

// Function to update active users 
function updateOptions(userslist) {
  if (userslist.includes(activeUsername)) {
    let userindex = userslist.indexOf(activeUsername);
    userslist.splice(userindex, 1);
  }
  deleteUserOptions();
  addUserOptions(userslist);
}

function deleteMessages(){
  let dmessages = document.getElementsByClassName("message")
  dmessages = [...dmessages]
  
  dmessages.forEach((dmsg)=>dmsg.remove())
}

// Function to search User
async function searchUser(){
  const toSearch = document.getElementById("search-user").value;
  const response = await fetch(`http://localhost:3010/searchuser/${toSearch}`)

  if (response.json().status === "found"){

  }
}

// Function to send Message
function sendMessage() {
  var messageBox = document.getElementById("input");
  const toName = document.querySelector("input[name='client']:checked").value;
  const msg = {
    from:activeUsername,
    to: toName,
    msg: messageBox.value,
  }
  socket.emit("fromUser", msg);
  messagesList.push(msg)
  displayMessage(msg)

  messageBox.value = "";
}

// Display message on website
function displayMessage(message){
  const newmsg = document.createElement("li");
  
  if (message.to === activeUsername ){// Display as incoming messages
    newmsg.setAttribute("class","message to-user")
    newmsg.innerHTML = message.msg
  }
  
  else {// Display as outgoing messages
    newmsg.setAttribute("class","message from-user")
    newmsg.innerHTML = message.msg
  }
    messagesDisplay.appendChild(newmsg);
}

function displayChat(selectedUser){
  deleteMessages()
  const requiredChat = messagesList.filter((message)=>{
    if (selectedUser.value === message.from || selectedUser.value === message.to)
      return message
  })
  requiredChat.map((message)=>displayMessage(message))
}

// connection with server
socket.on("connect", function () {
    socket.emit("register", activeUsername);
    document.title = activeUsername;

    console.log("Connected to Server");
  
});

// Update Users List
socket.on("updateUser", function (usersList, msg) {
  otherUsersNames = usersList;
  updateOptions(otherUsersNames);
  console.log(msg);
});



// message listener from server
socket.on("fromServer", function(messages){
  messagesList.push(...messages)
  if (messages.length && usersDisplayList.length)
    messages.map((message)=>displayMessage(message))
});

// when disconnected from server
socket.on("disconnect", function () {
  console.log("Disconnect from server");
});
