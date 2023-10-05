const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
  _id: mongoose.ObjectId,
  CategoryName: String,
  name: String,
  img: String,
  options: [[Object]], // This structure may need further definition
  description: String,
  Specification: {
    Brand: String,
    Type: String,
  },
  'Nutritional Facts': {
    Calories: String,
    Carbs: String,
    Fat: String,
    Protein: String,
  },
  AdditionalInfo: String,
  Ingredients: String,
  Features: String,
});

// Create the Product model using the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;