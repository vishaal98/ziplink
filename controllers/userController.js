const httpStatus = require("http-status");
const ApiError = require("../utils/apiError");
const catchAsync = require("../utils/catchAsync");
const userService = require("../services/userService");

module.exports.getUser = catchAsync(async (req, res) => {
  let userData = await userService.getUserById(req.params.userId);
  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (userData.email !== req.user.email) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "User not authorized to view some other user's data"
    );
  }
  if (req.query) {
    const { q } = req.query;
    if (q === "address") {
      const addressDetails = await userService.getUserAddressById(
        req.params.userId
      );
      res.send({ address: addressDetails.address });
    }
  }
  res.send(userData);
});

module.exports.setAddress = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (user.email != req.user.email) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "User not authorized to access this resource"
    );
  }

  const address = await userService.setAddress(user, req.body.address);

  res.send({
    address: address,
  });
});
