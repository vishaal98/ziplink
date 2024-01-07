const httpStatus = require("http-status");
const userService = require("./userService");
const ApiError = require("../utils/apiError");

module.exports.loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  const passwordMatches = await user.isPasswordMatch(password);

  if (!passwordMatches) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    links: user.links,
  };
};
