const express = require('express')
const router = express.Router()
const { loginPage,loginHandler ,chatPage, registerHandler}= require("./routeController")

router.get("/", loginPage);

router.get("/chat/",(chatPage))

router.post("/auth/login",loginHandler)
router.post("/auth/register",registerHandler)

module.exports = router