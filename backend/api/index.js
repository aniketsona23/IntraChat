require("dotenv").config();


const express = require("express")
const serverless = require("serverless-http")
const http = require("http")
const path = require("path");
const router = require("../routes/route.js");
const socketHandle = require("./sockets/socketHandler.js")
const startServer = require("./serverStart.js");
const bodyParser = require("body-parser")

const app = express();
const server = http.createServer(app);
const io = socketHandle(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use("/",router)


module.exports= serverless(app);

startServer(server)
