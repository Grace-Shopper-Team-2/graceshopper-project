const User = require('../db/models/User')

function loadUser(req, res, next) {
  const req.user = User.findByToken(req.headers.authentication)
  next()
}
