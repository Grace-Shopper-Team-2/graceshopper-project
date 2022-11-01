const User = require("../db/models/User");

const loadUser = (req, res, next) => {
  req.user = User.findByToken(req.headers.authentication);
  console.log(req.user);
  next();
};

module.exports = loadUser;
