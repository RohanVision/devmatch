// Importing express from node module
const express = require('express');
const connectDB = require('./config/database'); // Mongoose now connected to Cluster
// Instance of the express application
const app = express();
const cookieParser = require('cookie-parser');
const cors = require("cors");

app.use(
    cors({
        origin: "http://localhost:5173/",
        credentials: true,
    })
)
// This is middleware to convert JSON Obj to JavaScript Obj and add into req.body
app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter);

// ALL OLD APIs
// Find user with EmailId
// app.get("/user", async (req, res) => {
//     // const userEmail = req.body.emailId; // by email
//     const userId = req.body.userId;
//     console.log(userId);
//     try {
//         // console.log(userEmail);
//         const users = await User.findById(userId);
//         // const users = await User.findById({ emailId: userEmail });
//         if (users.length === 0) {
//             res.status(404).send("User Not Found")
//         } else {
//             res.send(`User found`);
//         }

//     } catch (error) {
//         res.status(404).send("Something went wrong");
//     }
// });

// app.patch("/user/:userId", async (req, res) => {
//     const userId = req.params?.userId;
//     const data = req.body;
//     try {
//         // Checked which Object can update
//         const ALLOWED_UPDATES = ["about", "gender", "age", "skills"];
//         const isUpdatedAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

//         if (!isUpdatedAllowed) {
//             throw new Error("Updates not allowerd");
//         }
//         // Checked which Object can update

//         if (data?.skills.length > 4) {
//             throw new Error("Only 4 skills allowed");
//         }

//         const users = await user.findByIdAndUpdate(userId, data,
//             {
//                 returnDocument: 'before',
//                 runValidators: true,
//             });

//         console.log(users);
//         res.send("User updated sucessfully");
//     } catch (error) {
//         res.status(404).send("Update Failed" + error.message)
//     }
// })

// // Delete the user by ID
// app.delete('/user', async (req, res) => {
//     const userId = req.body.userId;
//     try {
//         const users = await user.findByIdAndDelete(userId);
//         res.send("user deleted sucessfully");
//     } catch (error) {
//         res.status(404).send("User not found")
//     }
// })

// // Find all documents in the collection
// app.get("/feed", async (req, res) => {
//     try {
//         const users = await User.find({})
//         res.send(users)
//     } catch (error) {
//         res.status(404).send("Something went wrong");
//     }
// });

// // Find One User with findOne method
// app.get("/userOne", async (req, res) => {
//     const userEmail = req.body.emailId;
//     try {
//         const users = await User.findOne({ emailId: userEmail })
//         if (!users) {
//             res.status(404).send("User not found")
//         } else {
//             res.send(users);
//         }
//     } catch (error) {
//         res.status(404).send("Something went wrong");
//     }
// });



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
