const express = require('express')
const app = express();
const dotenv = require('dotenv').config()
const mongoose = require('./config/config') 
const cors = require('cors');
const commonRouter = require('../server/Routes/commonRoutes')

const port = 4000
// dotenv.config()
mongoose();

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json());


app.use('/',commonRouter)
app.listen(port,()=>{
    console.log("server started on the port",port);
})