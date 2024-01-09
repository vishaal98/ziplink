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
  //   if (req.query) {
  //     const { q } = req.query;
  //     if (q === "address") {
  //       const addressDetails = await userService.getUserAddressById(
  //         req.params.userId
  //       );
  //       res.send({ address: addressDetails.address });
  //     }
  //   }
  if (req.query) {
    const { q } = req.query;
    if (q === "links") {
      const linkDetails = await userService.getUserLinksById(req.params.userId);
      res.send({ links: linkDetails });
    }
  }
  res.send(userData);
});
