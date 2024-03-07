const mongoose = require("mongoose");

const schema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phonenumber:{
    type:Number,
    required:true
  
   },
  password: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    default:"user",
    required:true,

  }

});

const userModel = mongoose.model("Userdata", schema);
module.exports = userModel;
