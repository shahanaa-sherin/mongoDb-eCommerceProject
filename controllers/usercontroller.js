const userModel = require("../models/userSchema");
const twilio = require("../utilities/twilio");
const bcrypt = require("bcrypt");
const twilioVerify = require("../utilities/twilioVerify");
const jwt = require("jsonwebtoken");
const secretKey = "my_secret_key";
const object = {
  postSignup: async (req, res) => {
    const { username, email, phonenumber, password } = req.body;
    console.log(req.body);
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      await res.status(400).json({ error: "user already exist.please login" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new userModel({
        username: username,
        email: email,
        phonenumber: phonenumber,
        password: hashedPassword,
      });
      await user.save();
      res.status(200).json({ message: "user logged" });
    }
  },

  verify: async (req, res) => {
    const phonenumber = req.body.phonenumber;
    const phone = await userModel.findOne({ phonenumber: phonenumber });
    if (phone) {
      twilio(phonenumber)
        .then(() => {
          res
            .status(200)
            .json({ otpsend: true, message: "data saved successfully" });
        })
        .catch((error) => {
          res.status(400).json({ otpsend: false, error: "error occured" });
        });
    } else {
      await res.status(500).json({ message: "enter a valid phonenumber" });
    }
  },
  validateotp: async (req, res) => {
    const { otp, phonenumber } = req.body;
    // console.log(otp, phonenumber)
    const phonenum = await userModel.findOne({ phonenumber: phonenumber });
    console.log(phonenum.phonenumber, phonenumber);
    if (phonenum.phonenumber == phonenumber) {
      const concatedOtp = parseInt(otp.join(""));
      console.log(concatedOtp);
      if (concatedOtp && phonenumber) {
        const verificationChecks = await twilioVerify(phonenumber, concatedOtp);
        console.log(verificationChecks.status);
        if (verificationChecks.status !== "approved") {
          res.status(401).json({ error: "otp is not valid " });
        } else {
          res.status(200).json({ message: "otp is  vaild" });
        }
      }
    } else {
      res.status(401).json({ error: "please enter existing number" });
    }
  },
  loginData: async (req, res) => {
    const { phonenumber, password } = req.body;
    try {
      const existingUser = await userModel.findOne({
        phonenumber: phonenumber,
      });
      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }
      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password" });
      }
      // If user is an admin, return userType as 'admin', else return 'user'
      const userType = existingUser.role === "admin" ? "admin" : "user";
      // Generate JWT token
      const token = jwt.sign({ userId: existingUser._id }, secretKey, {
        expiresIn: "1h",
      });
      // Send the response with token and userType
      res.status(200).json({ token, message: "login successful", userType });
    } catch (error) {
      console.error("Error during login ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  resetPassword: async (req, res) => {
    const { newPassword, phonenumber } = req.body;
    console.log(newPassword);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log(hashedPassword);
    const updatePassword = await userModel.findOneAndUpdate(
      { phonenumber: phonenumber },
      { $set: { password: hashedPassword } },
      { new: true }
    );
    if (!updatePassword) {
      res.status(500).json({ error: "Error occured when updating password" });
    }
  },
};

module.exports = object;
