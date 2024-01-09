const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (userId, expires, secret = process.env.JWT_SECRETE) => {
  const payload = {
    sub: userId,
    exp: expires,
    iat: Date.now(),
  };

  return jwt.sign(payload, secret);
};

module.exports.generateAuthTokens = async (user) => {
  const accessTokenExpiry =
    Math.floor(Date.now() / 1000) + process.env.accessExpirationMinutes * 60;

  const accessToken = generateToken(user._id, accessTokenExpiry);
  return {
    access: {
      token: accessToken,
      expires: new Date(accessTokenExpiry * 1000),
    },
  };
};
