const express = require("express");
const router = express.Router();
// const Newproducts = require("../models/Product");
const Product = require("../models/NewProduct")
const GroceryCategory = require("../models/Productcategory")


router.post("/GroceryData", async (req, res) => {
  try {

    const data = await Product.find().catch(error => console.error('Error:', error))
    const CategoryName = await GroceryCategory.find()
    if (data) {
      res.json({
        status: "ok",
        error: false,
        grocery_items: data,
        grocery_category: CategoryName
      });
    } else {
      // If either of the data sets is not defined or null, send an appropriate response
      res.status(404).json({ message: "Grocery items not found", error: true });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/GroceryData", (req, res) => {
  try {
    // Check if both global.grocery_items and global.grocery_category are defined and not null
    if (
      global.grocery_items !== undefined &&
      global.grocery_items !== null &&
      global.grocery_category !== undefined &&
      global.grocery_category !== null
    ) {
      // console.log(global.grocery_items, global.grocery_category);
      // Send an object containing both data sets
      res.json({
        grocery_items: global.grocery_items,
        grocery_category: global.grocery_category,
      });
    } else {
      // If either of the data sets is not defined or null, send an appropriate response
      res.status(404).json({ message: "Grocery items not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
