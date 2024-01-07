const User = require("../models/user");
const httpStatus = require("http-status");
const ApiError = require("../utils/apiError");
const bcrypt = require("bcryptjs");

const getUserById = async (id) => {
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

module.exports.getUserAddressById = async (id) => {
  const address = await User.findOne({ _id: id }, { address: 1, email: 1 });
  return address;
};

module.exports.setAddress = async (user, newAddress) => {
  user.address = newAddress;
  await user.save();

  return user.address;
};
