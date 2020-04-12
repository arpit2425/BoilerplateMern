const express = require("express");
const app = express();
const mongoose = require("mongoose");
const keys = require("./config/dev");
mongoose
  .connect(keys.database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server started"));
