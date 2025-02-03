// Importing express from node module
const express = require('express');
const connectDB = require('./config/database'); // Mongoose now connected to Cluster
// Instance of the express application
const app = express();
const User = require('./models/user');
const user = require('./models/user');
const { validateSignUpData } = require('./utils/validation');
const bcrypt = require('bcrypt');
// This is middleware to convert JSON Obj to JavaScript Obj and add into req.body
app.use(express.json());

// creating new instance of user model reading the data we receive from end user (POSTMAN, BROWSER) by req.body(API)
app.post("/signup", async (req, res) => {
    try {
        //validation of data which comes from Request
        validateSignUpData(req);

        const { firstName, lastName, emailId, password } = req.body;
        // Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);

        console.log("Hashed Password" + " " + passwordHash);
        console.log(req.body);

        // Creating New User Instance
        const user = new User({
            firstName, lastName, emailId, password: passwordHash
        });

        await user.save(); // Saving the new user model
        res.send("User Data added");
    } catch (error) {
        res.status(400).send("Error : " + error.message)
    }
});

// Login User
app.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            throw new Error("Email ID is not present in database")
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error("Password doesn't match")
        } else {
            res.send("Login Sucessfully");
        }

    } catch (error) {
        res.status(400).send("Error : " + error.message)
    }
})

// Find user with EmailId
app.get("/user", async (req, res) => {
    // const userEmail = req.body.emailId; // by email
    const userId = req.body.userId;
    console.log(userId);
    try {
        // console.log(userEmail);
        const users = await User.findById(userId);
        // const users = await User.findById({ emailId: userEmail });
        if (users.length === 0) {
            res.status(404).send("User Not Found")
        } else {
            res.send(`User found`);
        }

    } catch (error) {
        res.status(404).send("Something went wrong");
    }
});

app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;
    try {
        // Checked which Object can update
        const ALLOWED_UPDATES = ["about", "gender", "age", "skills"];
        const isUpdatedAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

        if (!isUpdatedAllowed) {
            throw new Error("Updates not allowerd");
        }
        // Checked which Object can update

        if (data?.skills.length > 4) {
            throw new Error("Only 4 skills allowed");
        }

        const users = await user.findByIdAndUpdate(userId, data,
            {
                returnDocument: 'before',
                runValidators: true,
            });

        console.log(users);
        res.send("User updated sucessfully");
    } catch (error) {
        res.status(404).send("Update Failed" + error.message)
    }
})

// Delete the user by ID
app.delete('/user', async (req, res) => {
    const userId = req.body.userId;
    try {
        const users = await user.findByIdAndDelete(userId);
        res.send("user deleted sucessfully");
    } catch (error) {
        res.status(404).send("User not found")
    }
})

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





