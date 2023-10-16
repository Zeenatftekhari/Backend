const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Product = require("../models/Product");
const mongoose = require("mongoose");
const {
    Types: { ObjectId },
} = mongoose;

router.get("/Getparticipatedataby/:mobileNumber", async (req, res) => {
    const mobileNumber = req.params.mobileNumber;
    try {
        const user = await User.findOne({ MobileNumber: mobileNumber });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // console.log(user, "user")

        let participatedProducts = user.participatedProducts;
        // console.log(participatedProducts, "participatedProducts");

        const productIds = participatedProducts.map((item) => item.productId);
        // console.log(productIds, "productIds");

        const finalIds = productIds.filter(
            (ids) => new mongoose.Types.ObjectId(ids)
        );
        // console.log(finalIds, "122")
        const quantities = participatedProducts.reduce((acc, item) => {
            acc[item.productId] = item.quantity;
            return acc;
        }, {});
        const tokenAmount = participatedProducts.reduce((acc, item) => {
            acc[item.productId] = item.tokenAmount;
            return acc;
        }, {});
        // console.log(tokenAmount, "fgf")
        let matchedGroceryItems;
        try {
            matchedGroceryItems = await Product.find({
                _id: {
                    $in: finalIds,
                },
            });
            //console.log(matchedGroceryItems, 'matchedGroceryItems');
        } catch (error) {
            console.error("Error fetching products:", error);
            return res.status(500).json({ error: "Error fetching products" });
        }

        const response = matchedGroceryItems.map((item, ind) => {
            return {
                item,
                quantity: quantities[item._id] || 0,
                tokenAmount: tokenAmount[item._id] || 0,
            };
        });
        console.log(response, "response");
        res.json({
            status: "ok",
            error: false,
            data: response,
            message: "Bidding Data Fetched successfully",
        });
    } catch (error) {
        console.error("Internal server error:", error);
        return res
            .status(500)
            .json({ error: true, message: "Internal Server Error" });
    }
});

module.exports = router;
