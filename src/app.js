// Importing express from node module
const express = require('express');
const connectDB = require('./config/database'); // Mongoose now connected to Cluster
// Instance of the express application
const app = express();
const User = require('./models/user');

app.post("/signup", async (req, res) => {
    const user = new User({
        firstName: "Sachin",
        lastName: "Tendulkar",
        emailId: "sachin@gmail.com",
        password: "sachin123",
    });

    try {
        await user.save();
        res.send("User Data added");
    } catch (error) {
        res.status(400).send("Error found")
    }
})


// It return 'PROMISE' so we can handle happy and bad case by using then and catch method
connectDB()
    .then(() => {
        // Listen to the server on PORT Number, Also have call back function, only called when server is up and running
        app.listen(7777, () => {
            console.log("Server Running on 7777 Port")
        })
        console.log('Database connection established');
    })
    .catch((err) => {
        console.log('Database cannot be connected');
    });





