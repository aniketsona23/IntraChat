require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "https://intra-chat.vercel.app",
}));

app.use(express.json());

app.get("/", (req, res) => {
  console.log("Hello");
  res.send("<h1>Hello World</h1>");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
