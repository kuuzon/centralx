const ApiError = require('../utilities/ApiError');
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const debugJWT = require('debug')('app:jwt');

const auth = (req, res, next) => {
  // Load token from header
  const token = req.header("x-auth-token");

  // 400 ERROR: Token not passed with header
  if (!token) {
    return next(ApiError.denyAccess("No token provided"));
  }

  // Test for valid token using app key (to decode)
  try {
    const decoded = jwt.verify(token, config.authentication.jwtSecret);   // Decodes the token
    req.user = decoded;   // Loads the decoded token into req.user so that it can be used by the next bit of middleware or controller 
    debugJWT(`User credentials verified: ${req.user.username}`)
    next(); 

  // 400 ERROR: Invalid token (catches "exception")
  } catch (ex) {
    debugJWT(ex);
    return next(ApiError.denyAccess("Invalid token"));
  }
}

const admin = (req, res, next) => {
  // NOTE: Has access to req.user, as auth.js middleware exposes this data to subsequent middleware
  if (!req.user.isAdmin) {
    debugJWT(req.user);
    return next(ApiError.forbidden("Insufficient permissions"));
  }
  debugJWT(`Administrative access granted: ${req.user.isAdmin}`)
  next();
}

const verifyAuth = {
  auth,
  admin
}

module.exports = verifyAuth