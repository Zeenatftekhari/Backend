const express = require('express');
const cors = require('cors');
const path = require('path'); 
const app = express();
const port = 5000; // Change the port to 3000

const mongoDB = require("./db");
const connectToDB = require('./db');

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  })
);

// Serve the frontend build folder
app.use(express.static(path.join(__dirname, 'mernapp')));

connectToDB();

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'mernapp', 'public', 'index.html'));
});

app.use(express.json());
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
