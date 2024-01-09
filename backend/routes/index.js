const express = require("express");
const router = express.Router();
const linkController = require("../controllers/linkController");

router.get("/", (req, res) => {
  return res.status(200).json({
    data: {
      message: "This is Homepage",
    },
  });
});

router.use("/auth", require("./auth"));
router.use("/users", require("./users"));
router.use("/links", require("./links"));

router.get("/:id", linkController.redirectToOriginal);

module.exports = router;
