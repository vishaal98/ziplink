const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");
// const { authService, userService, tokenService } = require("../services");

module.exports.register = catchAsync(async (req, res) => {
  //   const user = await userService.createUser(req.body);
  //   const tokens = await tokenService.generateAuthTokens(user);
  //   res.status(200).send({ user, tokens });
});

module.exports.login = catchAsync(async (req, res) => {
  //   const { email, password } = req.body;
  //   const user = await authService.loginUserWithEmailAndPassword(email, password);
  //   const tokens = await tokenService.generateAuthTokens(user);
  //   res.send({ user, tokens });
});
