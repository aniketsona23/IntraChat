const express = require('express')
const router = express.Router()
const { loginPage,loginHandler ,chatPage, registerHandler , searchUser}= require("./routeController")

router.get("/", loginPage);

router.get("/chat/",(chatPage))

router.post("/login",loginHandler)
router.post("/register",registerHandler)
router.get("/searchuser/:searchname",searchUser)

module.exports = router