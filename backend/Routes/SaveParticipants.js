// routes/participant.js
const express = require("express");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const router = express.Router();
const Participant = require("../models/participants");
const User = require("../models/User");

// Endpoint to add a product for a user
router.post("/users/:userId/products", async (req, res) => {
  const userIdString = req.params.userId;
  try {
    const userId = userIdString;
    const { productId, quantity } = req.body;
    console.log(req, "rquest");
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.participatedProducts = user.participatedProducts || [];
    const existingProductIndex = user.participatedProducts.findIndex(
      (product) => {
        return product && product._id && product._id.toString() === productId;
      }
    );
    if (existingProductIndex !== -1) {
      console.log(existingProductIndex, "product");
      user.participatedProducts[existingProductIndex].quantity += quantity;
    } else {
      user.participatedProducts.push(req.body);
    }
    console.log(user, "user to be updated");
    let response = await User.findByIdAndUpdate(userId, user, { new: true });
    const updatedUser = await User.findById(userId);
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
