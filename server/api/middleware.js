//store all of our functions that act as middleware between req and res
const User = require("../db/models/User");

const loadUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const isAdmin = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send("You don't have access");
  } else {
    next();
  }
};

module.exports = { loadUser, isAdmin };
