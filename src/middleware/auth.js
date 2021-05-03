const jwt = require('jsonwebtoken')
const User = require('../models/user')

const generateAuthToken = async (user, res) => {
  const token = jwt.sign({ _id: user._id.toString() },
    process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);
  return token
};

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded._id)

    if (!user) {
      throw new error()
    }

    req.token = token
    req.user = user
    next()
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate properly.' })
  }
}

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.roles)) {
      res.status(403).send({ error: 'You do not have permission to perform this action.' })
    }
    next();
  }
}

module.exports = {
  auth,
  restrictTo,
  generateAuthToken
}