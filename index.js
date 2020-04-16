const express = require("express");
const app = express();
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieparser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("./config/keys");
const { isAuth } = require("./controller/authController");
const User = require("./model/User");
mongoose
  .connect(keys.database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));
app.use(express.json());
app.use(cookieparser());
const createToken = (id) => {
  return jwt.sign({ id }, key.privateJwtKey, { expiresIn: "40d" });
};
app.post("/api/users", async (req, res) => {
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
app.get("/api/users/logout", isAuth, async (req, res) => {
  await User.findByIdAndUpdate({ _id: req.user._id }, { token: "" });
  res.send("logout");
});
app.get("/api/users/auth", isAuth, (req, res) => {
  if (!req.user) {
    return res.send("please Login first");
  }
  res.json({
    user: req.user,
  });
});
app.post("/api/users/login", async (req, res) => {
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server started"));
