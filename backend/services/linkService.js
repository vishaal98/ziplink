const catchAsync = require("../utils/catchAsync");
const Link = require("../models/link");
const randomString = require("randomstring");
const User = require("../models/user");
require("dotenv").config();

module.exports.createURL = async (originalURL) => {
  const code = randomString.generate(8);
  const shortURL = `${process.env.DOMAIN}/${code}`;

  const link = await Link.create({
    originalURL: originalURL,
    shortURL: shortURL,
    code: code,
    visited: 0,
  });

  return link;
};

module.exports.findOriginal = async (code) => {
  const link = await Link.findOne({ code: code });
  if (link) {
    link.visited += 1;
    link.save();
  }

  return link;
};

module.exports.getAllLinks = async (user) => {
  const populatedUser = await User.findOne({ _id: user._id }).populate("links");
  return populatedUser.links;
};
