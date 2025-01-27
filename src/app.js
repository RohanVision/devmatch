// Importing express from node module
const express = require('express');
const { authetication, userAuth } = require('./middlewares/auth');

// Instance of the express application
const app = express();


// We are not getting error over ye below route 
// Always write towards the end
app.use('/', (err, req, res, next) => {
    if (err) {
        // Always Log your errors
        res.status(500).send('Something went wrong');
    }
});

// But Good Way to handle errors are try-catch
// Also we handling error in this route itself 
app.get('/getUserData', (req, res) => {
    //try {
    throw new Error("asbdas");
    res.send('user data send');
    // } catch (err) {
    //     res.status(500).send('Some Error occured contact suppport')
    // }
});

// If we comment out try catch then below code will show error. Order matters
app.use('/', (err, req, res, next) => {
    if (err) {
        // Always Log your errors
        res.status(500).send('Something went wrong');
    }
});

// Listen to the server on PORT Number, Also have call back function, only called when server is up and running
app.listen(7777, () => {
    console.log("Server Running on 7777 Port")
})




