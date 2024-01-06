const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({
    data: {
      message: "This is Homepage",
    },
  });
});

router.use("/users", require("./users"));
router.use("./links", require("./links"));

module.exports = router;
