const path = require("path");
const User = require("../modals/userSchema");
const bcrypt = require("bcrypt");

function loginPage(req, res) {
  console.log("hello")
  res.sendFile(path.join(__dirname, "../public/login.html"));
  // res.send("<h1>hello</h1>")
}

function chatPage(req, res) {
  res.sendFile(path.join(__dirname, "../public/client.html"));
}

async function searchUser(req,res){
  const toSearch = req.params.searchname;
  const find = await User.findOne({username:toSearch})
  
  if (find){
    console.log("[+] User Found !")
    res.json({status:"found"})
  }
  else{
    console.log("[-] User not Found !")
    res.json({status:"Not Found"})
  }
}

async function checkPassword(enteredPass, realPass) {
  const result = await bcrypt.compare(enteredPass,realPass)
  return result;
}

async function loginHandler(req, res) {
  const { username, password } = req.body;
  try {
    
    const users = await User.findOne({ username: username });
    if (users && await checkPassword(password,users.password)) { 
      res.status(200).redirect(`/chat/?username=${username}`);
    }
    else {
      res
        .status(401)
        .send(
          `<h1>Invalid Username or Password</h1><a href="/">Go back to login</a>`
        );
    }

  } catch (err) {
    res.status(500).send("[-] Login Error  : " + err)
  }
}

async function registerHandler(req, res) {
  const { username, password } = req.body;

  try{

    const checkExists = await User.findOne({ username: username });
  
    if (checkExists){
      console.log("Username already Exists")
      res.status(409).send(`<h1>Username Already Exists</h1><a href="http://localhost:3010/">Go back to login</a>`)
    }
    else{
      await User.create({ username,password });
      res.redirect(`/`);
    }

  }catch(err){
    console.log("Registration Failed : "+err)
    res.status(500).send("Registration failed: "+err)
  }
}
  

module.exports = { loginPage, loginHandler, chatPage, registerHandler ,searchUser};
