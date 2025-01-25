// Importing express from node module
const express = require('express');
const { authetication, userAuth } = require('./middlewares/auth');

// Instance of the express application
const app = express();

app.use('/admin', authetication);
app.use('/user', userAuth)
// app.get('/user', userAuth, (req, res) => {
//     res.send('User Data Send')
// });

app.get('/user/login', (req, res) => {
    res.send('user logged in sucessfully')
})

app.get('/admin/getUserData', (req, res) => {
    res.send('All Data is Send');
})

// Listen to the server on PORT Number, Also have call back function, only called when server is up and running
app.listen(7777, () => {
    console.log("Server Running on 7777 Port")
})




