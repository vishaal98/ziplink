const express = require("express");
const router = express.Router();
const linkController = require("../controllers/linkController");

router.get("/", (req, res) => {
  return res.status(200).json({
    data: { message: "Hello this is working" },
  });
});
router.post("/shorten", linkController.shortenURL);

module.exports = router;
