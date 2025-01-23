// Importing express from node module
const express = require('express');

// Instance of the express application
const app = express();

// ****ORDER OF THE REQUEST HANDLER ALSO MATTER A LOT. EX- /hellotest - it will redirect to /hello only***
// Handling request allso called as Request Handler
// app.use((req, res) => {
//     res.send('Hello From the Dashboard')
// })

// All Request handlers are now seprated
app.get('/user', (req, res) => {
    res.send({ firstName: "Rohan", lastName: "Amberkar" });
});

app.post('/user', (req, res) => {
    res.send('Data stored in database sucessfully');
});

app.patch('/user', (req, res) => {
    res.send("Data Patch Sucessfully")
})

app.delete('/user', (req, res) => {
    res.send('Data Deleted From The Database')
});


// Listen to the server on PORT Number, Also have call back function, only called when server is up and running
app.listen(7777, () => {
    console.log("Server Running on 7777 Port")
})

// Npm nodemon to refresh server automatically
// npm i -g nodemon => -g install for global level
// in package.json use below command so no need to use nodemon app.js instead npm run dev
// "scripts": {
//     "dev": "nodemon src/app.js"
// },



// In app.use first parameter can be request handler but we write route '/hello' then it only handle request which has
// '/hello'
// app.use('/hello', (req, res) => {
//     res.send('Hello Hello Hello')
// })

// app.use('/test', (req, res) => {
//     res.send('Hello From The Server')
// })