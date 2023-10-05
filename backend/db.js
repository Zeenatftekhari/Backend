const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://zeenatiftekhari:Khulja%402409@cluster0.kwjcgbq.mongodb.net/weekly_group_by?retryWrites=true&w=majority';
//const mongoURI = 'mongodb://zeenatiftekhari:Khulja%402409@ac-1zuaec7-shard-00-00.kwjcgbq.mongodb.net:27017,ac-1zuaec7-shard-00-01.kwjcgbq.mongodb.net:27017,ac-1zuaec7-shard-00-02.kwjcgbq.mongodb.net:27017/weekly_group_by?ssl=true&replicaSet=atlas-vahiws-shard-0&authSource=admin&retryWrites=true&w=majority'

const connectToDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log("Connected to MongoDB successfully!");

        const groceryItemsData = await mongoose.connection.db.collection("grocery_items").find({}).toArray();
        console.log("Grocery Items Data:", groceryItemsData);

        // Fetch data from the "grocery_category" collection
        const groceryCategoryData = await mongoose.connection.db.collection("grocery_category").find({}).toArray();
        console.log("Grocery Category Data:", groceryCategoryData);

        // Assign the fetched data to global variables if needed
        global.grocery_items = groceryItemsData;
        global.grocery_category = groceryCategoryData;
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};


module.exports = connectToDB;