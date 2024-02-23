const express = require('express');
const Router = express.Router()

const {postSignup,verify,loginData,validateotp} = require('../controllers/userController')

Router.post("/register",postSignup)
Router.post("/getotp",verify)
Router.post("/login",loginData)
Router.post('/validateotp',validateotp)
module.exports = Router;

