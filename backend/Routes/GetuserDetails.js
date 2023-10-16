const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/user/:mobileNumber", async (req, res) => {
  const mobileNumber = req.params.mobileNumber;

  try {
    const user = await User.findOne({ MobileNumber: mobileNumber });

    if (user) {
      return res.json({ userInfo: [user] });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
