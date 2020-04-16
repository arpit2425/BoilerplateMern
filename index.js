const express = require("express");
const app = express();
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieparser = require("cookie-parser");

const userRoutes = require("./routes/userRoutes");

mongoose
  .connect(keys.database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));
app.use(express.json());
app.use(cookieparser());
app.use("/api/users", userRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server started"));
