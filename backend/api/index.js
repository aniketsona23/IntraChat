require("dotenv").config();
const express = require("express");
const router  = require("../routes/route")
const cors = require("cors");
const serverless = require("serverless-http");


const app = express();
const server = require("http").createServer(app);
app.use(cors({
  origin: "https://intra-chat.vercel.app",
}));

app.use(express.json());

app.get("/", (req, res) => {
  console.log("Hello");
  res.send("<h1>Hello World</h1>");
});

app.use("/api",router)

const port = process.env.PORT || 3000;

try{    
    mongoose.connect(db_url).then(()=>{
        console.log("[+] Connected to Database")
        server.listen(port, ()=>{
            console.log("[+] Server started at http://localhost:"+port);
        })
    })
    .catch(err=>{
        console.log("[-] Failed to connect to DataBase : "+err)
    })
}catch(err){
    console.log("[-] Server startup failed : "+err)
}


module.exports= serverless(app)