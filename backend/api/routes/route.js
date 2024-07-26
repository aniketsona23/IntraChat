const express = require('express')
const router = express.Router()
const { loginPage,loginHandler ,chatPage, registerHandler , searchUser}= require("./routeController")

router.get("/", loginPage);

router.get("/chat/",(chatPage))

router.post("/api/login",loginHandler)
router.post("/api/register",registerHandler)
router.get("/searchuser/:searchname",searchUser)

module.exports = router