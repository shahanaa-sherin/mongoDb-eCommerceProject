const userModel = require("../models/userSchema");
const twilio = require("../otpVerification/twilio");
const bcrypt = require('bcrypt');



const object = {
  postSignup: async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      res.status(400).json({ error: "user already exist.please login" });
    } else {
      const hashedPassword =  await bcrypt.hash(password,10)
      const user = new userModel({
        username: username,
        email: email,
        password: hashedPassword,
      });
      await user.save();
      res.status(200).json({ message: "user logged" });
    }
  },

  verify: async (req, res) => {
    const phonenumber = req.body.phonenumber;
    twilio(phonenumber)
      .then(() => {
        res
          .status(200)
          .json({ otpsend: true, message: "data saved successfully" });
      })
      .catch((error) => {
        res.status(400).json({ otpsend: false, error: "error occured" });
      });
  },
  loginData: async (req, res) => {
        const { username, password } = req.body;
        try {
          const existingUser = await userModel.findOne({ username: username });
          if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
          }
    
          if (existingUser.password !== password) {
            return res.status(401).json({ error: "Invalid password" });
          }
    
          // At this point, the user is successfully authenticated
          // You may generate and return a JWT token or create a session here
    
          res.status(200).json({ message: "Login successful" });
        } catch (error) {
          console.error("Error during login:", error);
          res.status(500).json({ error: "Internal server error" });
        }
      },
};


module.exports = object
