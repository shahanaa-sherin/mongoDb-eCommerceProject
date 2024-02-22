const express = require('express');
const Router = express.Router()

const {postSignup,verify,loginData} = require('../controllers/commoncontroller')

Router.post("/register",postSignup)
Router.post("/getotp",verify)

Router.post("/login",loginData)
module.exports = Router;

