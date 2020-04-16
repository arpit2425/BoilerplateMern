const express = require("express");
const app = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../config/keys");
const { isAuth } = require("../controller/authController");
const User = require("../model/User");
const createToken = (id) => {
  return jwt.sign({ id }, key.privateJwtKey, { expiresIn: "40d" });
};
app.post("/", async (req, res) => {
  if (req.body) {
    const user = await User.create(req.body);
    return res.status(201).json({
      status: "Success",
      user,
    });
  }
  return res.status(400).json({
    status: "Fail",
  });
});
app.get("/logout", isAuth, async (req, res) => {
  await User.findByIdAndUpdate({ _id: req.user._id }, { token: "" });
  res.send("logout");
});
app.get("/auth", isAuth, (req, res) => {
  if (!req.user) {
    return res.send("please Login first");
  }
  res.json({
    user: req.user,
  });
});
app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({
      message: "Incorrect email and password",
    });
  } else {
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(401).json({
        message: "Incorrect email and password",
      });
    } else {
      var token = createToken(user.id);

      res.cookie("auth_token", token).status(200).json({
        message: "Login Success",
        user,
      });
      user.token = token;
      req.user = await user.save();
    }
  }
});
module.exports = app;
