const express = require("express");
const router = express.Router();
const {
  loginHandler,
  registerHandler,
  searchUser,
} = require("./routeController");

router.get("/api",(req,res)=>{
  res.json({msg:"hellooo"})
})
router.post("/api/login", loginHandler);
router.post("/api/register", registerHandler);
router.get("/searchuser/:searchname", searchUser);

module.exports = router;
