const express = require("express");
const app = express();
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieparser = require("cookie-parser");
const User = require("./model/User");
mongoose
  .connect(keys.database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));
app.use(express.json());
app.use(cookieparser());
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server started"));
