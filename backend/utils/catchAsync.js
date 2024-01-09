function catchAsync(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch((err) =>
      res.status(err.statusCode).json({
        message: err.message,
      })
    );
  };
}

module.exports = catchAsync;
