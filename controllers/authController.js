const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const userService = require("../services/userService");
const authService = require("../services/authService");
const tokenService = require("../services/tokenService");

module.exports.register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.OK).send({ user, tokens });
});

module.exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});
