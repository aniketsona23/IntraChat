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
    console.log(await User.find({}))
  
    if (!users || users.password !=password){
        res.status(404).send(`<h1>Invalid Username or Password</h1><a href="/">Go back to login</a>`)
    }
    
    else{
        res.redirect(`/chat/?username=${username}`)
    }
}

async function registerHandler(req,res){
    const {username, password}= req.body
    const check = await User.find({username:username})
    if (!check.length){
        const users = await User.create({username,password})
        if (!users ){
            res.status(404).send(`<h1>Registration Failed</h1><a href="http://localhost:3010/">Go back to login</a>`)
        }
        else{
            res.redirect(`/`)
        }    
    }
    else{
        res.status(200).send(`<h1>Username Already Exists</h1><a href="http://localhost:3010/">Go back to login</a>`)
    }
    
}

module.exports = {loginPage ,loginHandler , chatPage,registerHandler}