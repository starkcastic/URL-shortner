require('dotenv').config();
// console.log("MONGO_URI:", process.env.MONGO_URI);
const express = require('express')
const bodyParser = require('body-parser');
const connectDB = require('./db');
const urlRoutes = require('./routes/urlRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// connect to the database
connectDB();

// middleware
app.use(bodyParser.json());

// serve static frontend files first, so they aren't swallowed by the
// wildcard GET /:shortUrl route below
app.use(express.static('public'));
app.use('/', urlRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});