const path = require("path")
const User = require("../modals/userSchema")

function loginPage(req,res){
    res.sendFile(path.join(__dirname, "../frontend/login.html"));
}

function chatPage(req,res){
    res.sendFile(path.join(__dirname,"../frontend/client.html"))
}

async function loginHandler(req,res){
    const {username,password} =req.body
    const users = await User.findOne({username:username})
  
    if (!users || users.password !=password){
        res.status(404).send(`<h1>Invalid Username or Password</h1>`)
    }
    
    else{
        res.redirect(`/chat/?username=${username}`)
    }
}

module.exports = {loginPage ,loginHandler , chatPage}