const mongoose = require('mongoose');

const groceryCategorySchema = new mongoose.Schema({
    _id: mongoose.ObjectId,
    CategoryName: {
        type: String,
        // required: true,
    },
});

// Create the Mongoose model
const GroceryCategory = mongoose.model('grocery_category', groceryCategorySchema);

module.exports = GroceryCategory;
