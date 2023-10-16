const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/GWB_USER";
//const mongoURI ="mongodb+srv://zeenatiftekhari:Khulja%402409@cluster0.kwjcgbq.mongodb.net/weekly_group_by?retryWrites=true&w=majority";
//const mongoURI = 'mongodb://zeenatiftekhari:Khulja%402409@ac-1zuaec7-shard-00-00.kwjcgbq.mongodb.net:27017,ac-1zuaec7-shard-00-01.kwjcgbq.mongodb.net:27017,ac-1zuaec7-shard-00-02.kwjcgbq.mongodb.net:27017/weekly_group_by?ssl=true&replicaSet=atlas-vahiws-shard-0&authSource=admin&retryWrites=true&w=majority'

const connectToDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      //  useCreateIndex: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
    });

    let db = await mongoose.connection
    //console.log(db.collections)
    // console.log(db.once('error', console.error.bind(console, 'MongoDB connection error:')))
    // .db.stats();
    // db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
      console.log('Connected to MongoDB');
    });

  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
  // console.log(db.Newproduct.find(), "find")
};

module.exports = connectToDB;
