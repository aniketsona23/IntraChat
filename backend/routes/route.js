const express = require("express");
const router = express.Router();
const {
  loginHandler,
  registerHandler,
  searchUser,
} = require("./routeController");

router.get("/",(req,res)=>{
  console.log("hell")
  res.send("<h1>HEllo</h1>")
})

router.post("/login", loginHandler);
router.post("/register", registerHandler);
router.get("/searchuser/:searchname", searchUser);

module.exports = router;
