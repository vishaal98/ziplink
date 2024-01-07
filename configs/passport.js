const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const User = require("../models/user");
require("dotenv").config();

const jwtOptions = {
  secretOrKey: process.env.JWT_SECRETE,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    console.log("user Check:", payload);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (err) {
    done(err, false);
  }
};

module.exports.jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
