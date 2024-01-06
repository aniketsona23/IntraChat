const socket = io()
let usersnames = []

const urlParams = new URLSearchParams(window.location.search)
const uname = urlParams.get("username")

document.title = uname

const userRadioslist = document.getElementById("users")
let user = {name : uname, id:""}

function updateOptions(userslist){
    let userindex = userslist.indexOf(user.name)
    userslist.splice(userindex,1)
    if (userRadioslist.childElementCount/2<userslist.length){
        for (let i=0;i<userslist.length;i++){
            var rads = document.createElement("input")
            rads.setAttribute("type","radio")
            rads.setAttribute("name","client")
            rads.setAttribute("id","client"+(i+1))
            rads.setAttribute("value",userslist[i])
            
            userRadioslist.appendChild(rads)
            var labels = document.createElement("label")
            labels.setAttribute("class","clientlabel")
            labels.setAttribute("for","client"+(i+1))
            labels.innerHTML = userslist[i]
            userRadioslist.appendChild(labels)
        }
        console.log(userRadioslist.childElementCount)
    }
}

// connection with server
socket.on('connect', function(){
    socket.emit("register",user)
    socket.on("register",function(userwithid){
      user.id= userwithid.id
    })
    updateOptions(usersnames)
    console.log('Connected to Server')
  });

// Update Users List
socket.on("updateUser",function(usersList,msg){
  console.log(msg);
  usersnames = Object.keys(usersList[0]);

  updateOptions(usersnames)
})

// emits message from user side
function send(){
  var value = document.getElementById("input")
  const toName = document.querySelector("input[name='client']:checked").value
  let toUser = {name:toName};
  
  socket.emit("fromUser",{from:user,to:toUser,msg:value.value})
  value.value = ""
}

// message listener from server
socket.on('fromServer', function(message){
      console.log(`${message.from.name} : ${message.msg}`)
  });

// when disconnected from server
socket.on('disconnect', function(){
    console.log('Disconnect from server')
  });

