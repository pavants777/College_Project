const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./routes/auth');
const Rides = require('./routes/rides')

const app = express();
const Port = process.env.PORT || 3000;
const DB = process.env.DB;

// Middleware to parse JSON bodies
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Routes
app.use(User);
app.use(Rides);

// MongoDB connection
mongoose.connect(DB)
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

// Start server
app.listen(Port, () => {
    console.log(`Server is running at http://localhost:${Port}`);
});