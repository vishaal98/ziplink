const Link = require("../models/link");
const randomString = require("randomstring");

module.exports.shortenURL = async (req, res) => {
  const originalURL = req.body.url;
  const code = randomString.generate(8);
  const shortURL = `http://127.0.0.1:5000/${code}`;

  const link = await Link.create({
    originalURL: originalURL,
    shortURL: shortURL,
    code: code,
    visited: 0,
  });

  return res.status(200).json({
    shortLink: shortURL,
  });
};

module.exports.redirectToOriginal = async (req, res) => {
  const code = req.params.id;
  try {
    const link = await Link.findOne({ code: code });
    link.visited += 1;
    link.save();

    return res.redirect(link.originalURL);
  } catch (err) {
    console.log("Error finding the link with code: ", code, " ====> ", err);
  }
};
