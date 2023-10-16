const express = require("express");
const router = express.Router();
const participants = require("../models/participants.js");
const User = require("../models/User");

router.get("/GetBiddingCountBy", async (req, res) => {
  let product_id = req.query["product_id"];
  try {
    const usersData = await User.find();
    let count;
    if (usersData) {
      let result = usersData?.map((user) =>
        user?.participatedProducts.map((element) => {
          if (element._id === product_id) {
            return element.quantity;
          } else {
            return 0;
          }
        })
      );
      console.log(result);
      count = result.flat().reduce((a, b) => a + b, 0);
    }

    if (count) {
      return res.json({ productCount: count });
    } else {
      return res.status(404).json({ error: "Something went wromg" });
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
