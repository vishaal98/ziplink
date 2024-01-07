const express = require("express");
const router = express.Router();
const linkController = require("../controllers/linkController");
const auth = require("../middlewares/auth");

router.get("/", (req, res) => {
  return res.status(200).json({
    data: { message: "Hello this is working" },
  });
});
router.post("/shorten", auth, linkController.shortenURL);
router.get("/mylinks", auth, linkController.getAllLinks);

module.exports = router;
