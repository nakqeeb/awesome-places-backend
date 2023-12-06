const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    // S12 L8
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // "bearer token"
    if (!token) {
      throw new Error("Not authenticated.");
    }
    const decodedToken = jwt.verify(token, "dont_share_this_its_secret");
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError("Not authenticated.", 403);
    return next(error);
  }
};
