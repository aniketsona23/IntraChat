require("dotenv").config();
const express = require("express");
const router = require("../routes/route");
const cors = require("cors");
const socketIO = require("socket.io");
// const serverless = require("serverless-http");
const socketHandle = require("./sockets/socketHandler.js");
const db_url = process.env.DB_URI;
const { default: mongoose } = require("mongoose");

const app = express();
const server = require("http").createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "https://intra-chat.vercel.app",
    methods: ["GET", "POST"],
  },
});

socketHandle(io);

app.use(
  cors({
    origin: "https://intra-chat.vercel.app",
  })
);

app.use(express.json());
app.use("/api", router);

const port = process.env.PORT || 3000;

try {
  mongoose
    .connect(db_url)
    .then(() => {
      console.log("[+] Connected to Database");
      server.listen(port, () => {
        console.log("[+] Server started at http://localhost:" + port);
      });
    })
    .catch((err) => {
      console.log("[-] Failed to connect to DataBase : " + err);
    });
} catch (err) {
  console.log("[-] Server startup failed : " + err);
}

// module.exports = serverless(app);
