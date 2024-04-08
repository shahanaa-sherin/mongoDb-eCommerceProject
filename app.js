const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("../server/config/config");
const cors = require("cors");
const commonRouter = require("./Routes/userRoutes");
const productRouter = require('./Routes/productRoutes')

const port = 4000;
mongoose();
dotenv.config
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", commonRouter);
app.use('/',productRouter)
app.listen(port, () => {
  console.log("server started on the port", port);
});
