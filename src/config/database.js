const mongoose = require('mongoose');

// To connect our Clusture. 
const connectDB = async () => {
    // Also it return promise so we need to call inside Async function
    await mongoose.connect('mongodb+srv://amberkarrohan17:wildfire123@cluster0.la9dial.mongodb.net/devmatch');
    // mongodb+srv://amberkarrohan17:wildfire123@cluster0.la9dial.mongodb.net/helloWordl - connect to Specific database
}

module.exports = connectDB;