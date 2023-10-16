const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id: String,
    CategoryName: String,
    name: String,
    img: String,
    options: [
        {
            MRP: String,
            Starting_Price: String,
            Best_Price: String,
            Current_Price: String,
            Purchased: String,
            Next_Price_drops_at: String,
            Purchased_by_X_Buyers: String,
        },
    ],
    description: String,
    Specification: {
        Brand: String,
        Type: String,
    },
    NutritionalFacts: {
        Calories: String,
        Carbs: String,
        Fat: String,
        Protein: String,
    },
    AdditionalInfo: String,
    Ingredients: String,
    Energy: String,
    Carbohydrate: String,
    Saturated: String,
    Sugar: String,
    Sodium: String,
});

const Newproduct = mongoose.model('newproduct', productSchema);

module.exports = Newproduct;
