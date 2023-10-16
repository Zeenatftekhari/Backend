const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const PORT = 5000;

// const mongoDB = require("./db");
// const { connect } = require("mongoose");
const connectToDB = require("./db");

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:4000", "https://bb9a-103-118-147-180.ngrok.io"], // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "source",
    ], // Allow these headers
  })
);

connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/GetuserDetails"));
app.use("/api", require("./Routes/SaveParticipants"));
app.use("/api", require("./Routes/GetBiddingCountByProductId"));
app.use("/api", require("./Routes/Getparticipatedataby"));
app.use("/api", require("./Routes/RazorpayToken"));
app.use("/api", require("./Routes/TokenPaymentVerification"))

// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${port}`);
// });
