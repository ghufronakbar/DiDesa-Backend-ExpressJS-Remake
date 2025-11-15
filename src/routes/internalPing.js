const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({ status: 200, message: "Pong" });
});

module.exports = router;
