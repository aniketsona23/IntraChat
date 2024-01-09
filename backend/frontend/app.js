const socket = io();

const urlParams = new URLSearchParams(window.location.search);
const activeusername = urlParams.get("username");

let otherUsersNames = [];
let usersDisplayList = [];

const messagesDisplay = document.getElementById("messages");
const userDisplayContainer = document.getElementById("users");

// function to delete all radio buttons
function deleteOptions() {
  usersDisplayList.forEach((element) => {
    userDisplayContainer.removeChild(element);
  });
  usersDisplayList = [];
}

// function to create radio buttons for active users
function addOptions(userlist) {
  for (let i = 0; i < userlist.length; i++) {
    let tempContainer = document.createElement("div");
    var rads = document.createElement("input");
    rads.setAttribute("type", "radio");
    rads.setAttribute("name", "client");
    rads.setAttribute("id", "client" + (i + 1));
    rads.setAttribute("value", userlist[i]);
    tempContainer.appendChild(rads);

    var labels = document.createElement("label");
    labels.setAttribute("class", "clientlabel");
    labels.setAttribute("for", "client" + (i + 1));
    labels.innerHTML = userlist[i];

    tempContainer.appendChild(labels);
    tempContainer.setAttribute("class", "user-radio");

    userDisplayContainer.appendChild(tempContainer);
    usersDisplayList.push(tempContainer);
  }
  if (usersDisplayList.length) {
    document.getElementById("client1").checked = true;
  }
}

function updateOptions(userslist) {
  if (userslist.includes(activeusername)) {
    let userindex = userslist.indexOf(activeusername);
    userslist.splice(userindex, 1);
  }
  deleteOptions();
  addOptions(userslist);
}

// connection with server
socket.on("connect", function () {
  if (!activeusername) {
    window.location = "http://localhost:3000/auth";
  } else {
    socket.emit("register", activeusername);
    document.title = activeusername;

    console.log("Connected to Server");
  }
});

// Update Users List
socket.on("updateUser", function (usersList, msg) {
  otherUsersNames = usersList;
  updateOptions(otherUsersNames);
  console.log(msg);
});

// emits message from activeusername side
function send() {
  var messageBox = document.getElementById("input");
  const toName = document.querySelector("input[name='client']:checked").value;

  socket.emit("fromUser", {
    from: activeusername,
    to: toName,
    msg: messageBox.value,
  });
  messageBox.value = "";
}

// message listener from server
socket.on("fromServer", function (message) {
  const newmsg = document.createElement("li");
  newmsg.innerHTML = `${message.from} : ${message.msg}`;
  messagesDisplay.appendChild(newmsg);
});

// when disconnected from server
socket.on("disconnect", function () {
  console.log("Disconnect from server");
});
