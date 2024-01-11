const express = require('express')
const router = express.Router()
const { loginPage,loginHandler ,chatPage}= require("./routeController")

router.get("/", loginPage);

router.get("/chat/",(chatPage))

router.post("/auth/login",loginHandler)

module.exports = router