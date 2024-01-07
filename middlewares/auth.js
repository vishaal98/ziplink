const passport = require("passport");
const httpStatus = require("http-status");
const ApiError = require("../utils/apiError");

const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
  if (err || !user || info) {
    return reject(
      new ApiError(httpStatus.UNAUTHORIZED),
      "Please authenticate!"
    );
  }
  req.user = user;
  resolve();
};

const auth = async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      "jwt",
      { session: false },
      verifyCallback(req, resolve, reject)
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => {
      console.log(err);
      return res.status(401).json({
        error: "Please Authenticate",
      });
    });
};

module.exports = auth;
