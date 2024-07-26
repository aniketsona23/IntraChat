require("dotenv").config();
const socketIO = require("socket.io");

const cors = require("cors");
const express = require("express");
const serverless = require("serverless-http");
const http = require("http");
const router = require("../routes/route.js");
const socketHandle = require("./sockets/socketHandler.js");
const startServer = require("./serverStart.js");

const app = express();
const server = http.createServer(app);
// const io = socketIO(server, {
//   cors: {
//     origin: "https://intra-chat.vercel.app",
//     methods: ["GET", "POST"],
//   },
// });

// app.use(
//     cors({
//     origin: "https://intra-chat.vercel.app",
// })
// );
app.use(express.json());
app.use("/api", router);

app.get("/", (req, res) => {
    console.log("Hello1");
    res.send("<h1>Nigga why</h1>").status(200);
});
// socketHandle(io);

module.exports = serverless(app);
// startServer(server);
