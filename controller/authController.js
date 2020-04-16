const User = require("./../model/User");
const key = require("./../config/keys");
const jwt = require("jsonwebtoken");
module.exports.isAuth = async (req, res, next) => {
  let token = req.cookies.auth_token;
  if (token) {
    try {
      var decoded = await jwt.verify(token, key.privateJwtKey);
    } catch (err) {
      next(err.message);
    }

    var user = await User.findOne({ _id: decoded.id, token: token });
  }
  req.user = user;
  next();
};
