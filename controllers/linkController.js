const catchAsync = require("../utils/catchAsync");
const linkService = require("../services/linkService");
const httpStatus = require("http-status");
require("dotenv").config();

module.exports.shortenURL = catchAsync(async (req, res) => {
  //   const originalURL = req.body.url;
  //   const code = randomString.generate(8);
  //   const shortURL = `${process.env.DOMAIN}/${code}`;

  //   const link = await Link.create({
  //     originalURL: originalURL,
  //     shortURL: shortURL,
  //     code: code,
  //     visited: 0,
  //   });

  const link = linkService.createURL(req.body.url);

  return res.status(httpStatus.OK).json({
    shortLink: link.shortURL,
  });
});

module.exports.redirectToOriginal = catchAsync(async (req, res) => {
  //   const code = req.params.id;
  //   const link = await Link.findOne({ code: code });
  //   link.visited += 1;
  //   link.save();

  const link = await linkService.findOriginal(req.params.id);

  return res.redirect(link.originalURL);
});
