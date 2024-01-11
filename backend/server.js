require("dotenv").config();


const socketHandle = require("./socketHandler.js")
const express = require("express")
const serverless = require("serverless-http")
const http = require("http");
const path = require("path");
const User = require("./modals/userSchema");
const router = require("./routes/router.js");
const startServer = require("./serverStart.js");

const app = express();
const server = http.createServer(app);
const io = socketHandle(server);

app.use(express.static(path.join(__dirname, "/frontend")));
app.use("/",router)


module.exports= serverless(app);

startServer(server)
