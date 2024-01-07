const User = require("../models/user");
const httpStatus = require("http-status");
const ApiError = require("../utils/apiError");
const bcrypt = require("bcryptjs");

module.exports.getUserById = async (id) => {
  return User.findOne({ _id: id });
};

module.exports.getUserByEmail = async (email) => {
  return User.findOne({ email });
};

module.exports.createUser = async (data) => {
  if (await User.isEmailTaken(data.email)) {
    throw new ApiError(httpStatus.OK, "Email already taken");
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(data.password, salt);

  const newUser = await User.create({ ...data, password: hashedPassword });
  return newUser;
};

module.exports.getUserLinksById = async (id) => {
  const user = await User.findOne({ _id: id });
  return user.links;
};

module.exports.addLinks = async (linkId, userId) => {
  const user = await User.findById({ _id: userId });
  user.links.push(linkId);
  user.save();
};
