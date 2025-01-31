// Importing express from node module
const express = require('express');
const connectDB = require('./config/database'); // Mongoose now connected to Cluster
// Instance of the express application
const app = express();
const User = require('./models/user');
// This is middleware to convert JSON Obj to JavaScript Obj and add into req.body
app.use(express.json());

// creating new instance of user model reading the data we receive from end user (POSTMAN, BROWSER) by req.body(API)
app.post("/signup", async (req, res) => {
    console.log(req.body)
    const user = new User(req.body);
    // const user = new User({
    //     firstName: "Sachin",
    //     lastName: "Tendulkar",
    //     emailId: "sachin@gmail.com",
    //     password: "sachin123",
    // });

    try {
        await user.save(); // Saving the new user model
        res.send("User Data added");
    } catch (error) {
        res.status(400).send("Error found")
    }
});
// Find user with EmailId
app.get("/user", async (req, res) => {
    // const userEmail = req.body.emailId; // by email
    const userId = req.body.id;
    console.log(userId);
    try {
        // console.log(userEmail);
        const users = await User.findById({ _id: userId });
        // const users = await User.findById({ emailId: userEmail });
        if (users.length === 0) {
            res.status(404).send("User Not Found")
        } else {
            res.send(users);
        }

    } catch (error) {
        res.status(404).send("Something went wrong");
    }
});

// Find all documents in the collection
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(404).send("Something went wrong");
    }
});

// Find One User with findOne method
app.get("/userOne", async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const users = await User.findOne({ emailId: userEmail })
        if (!users) {
            res.status(404).send("User not found")
        } else {
            res.send(users);
        }
    } catch (error) {
        res.status(404).send("Something went wrong");
    }
});


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





