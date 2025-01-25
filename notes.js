/******** Notes *********/

// Import Express From the Module
const express = require('express');

// call the instance of express application
const app = express();

// Example of Order of Request Handler
// ORDER OF THE REQUEST HANDLER ALSO MATTER A LOT. EX- /hellotest - it will redirect to /hello only
app.use('/hello', (req, res) => {
    res.send('Hello From The Dashboard');
});
// Example of Order of Request Handler

// Types of request handlers
app.get('/test', (req, res) => {
    res.send('Data sent sucessfully')
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
// Types of request handlers


// Dynamic Rotes
app.get('/user/:userid/:password', (req, res) => {
    //Read the 'QUERY' Parameter which we add at postman /user&userId=101
    console.log(req.query);
    // Handle dynamic API with params ex - /user/:userid/ - : here means dynamic
    console.log(req.params);
    res.send({ firstName: "Rohan", lastName: "Amberkar" });
})



// Never Do this The code will run and response will also generate but thrown an error because we can not set header twice after they sent to client
app.use('/user', (req, res, next) => {
    console.log("Response 1")
    res.send('Response 1');
    next();
}, (req, res, next) => {
    console.log('response 2');
    // Express won't allowed to send second header
    res.send('response 2')
}
);


// Produce Can not GET error
app.use('/user', (req, res, next) => {
    console.log("Response 1")
    // res.send('Response 1');
    next();
}, (req, res, next) => {
    console.log('response 2');
    // res.send('response 2')
    next()
}, (req, res, next) => {
    console.log('response 3');
    // res.send('response 3')
    next()
}, (req, res, next) => {
    console.log('response 3');
    // res.send('response 3')
    // now it will throw error that 'cannot GET' because it cannot find User but if we remove next() that means we can not 'handle route' so POSTMAN will hang
    next();
}
);


// Wrapping Request Handler function into araay 
// Ex Wrapping 2 request handler fn-  (req, resp) => { [rh1, rh2], rh3, rh4 } or All function
app.use(
    '/user',
    [(req, res, next) => {
        console.log("Response 1")
        // res.send('Response 1');
        next();
    }, (req, res, next) => {
        console.log('response 2');
        // res.send('response 2')
        next()
    }, (req, res, next) => {
        console.log('response 3');
        // res.send('response 3')
        next()
    }, (req, res, next) => {
        console.log('response 3');
        res.send('response 3')
        next() // now it will throw error that cannot GET
    }]
);

// Create Auth middleware 

// Step 1: Create a folder name middlewares
// stea 2: create authetication middleware function for admin
// step 3:
const authetication = (req, res, next) => {
    console.log('Admin Auth is getting checked');
    const token = 'xxx';
    const isAdminAuthorize = token === 'xyz';
    if (!isAdminAuthorize) {
        res.status(401).send('Admin is not authorize')
    } else {
        next();
    }
}
// step 4: Export the function
module.exports = {
    authetication,
}
// step 5: Import that module
const { authetication, userAuth } = require('./middlewares/auth');
// step 6:
// This will cover all Admin path
app.use('/admin', authetication);
app.get('/admin/getuserData', (req, res) => {
    res.send("All Data is Sent")
});

// OR We can do it by for User

const userAuth = (req, res, next) => {
    console.log('user auth checking');
    const token = 'xyz';
    const isUserAuthorize = token === 'xyz';
    if (!isUserAuthorize) {
        res.status(401).send('User is not authorize');
    } else {
        next();
    }
}

module.exports = {
    authetication,
    userAuth
}
//  For single /user api we user Auth so if if userAuth is not valid It wont reach to this code
app.get('/user', userAuth, (req, res) => {
    res.send('User Data Send')
});
// due to above code our /user/login is seprated from auth
// We can avoid Auth for  this if we dont need by simply removing auth
app.post('/user/login', (req, res) => {
    res.send('user logged in sucessfully')
})


// By using middleware we can simply customize our req handler




// Listen to the server on PORT Number, Also have call back function, only called when server is up and running
app.listen(7777, () => {
    console.log("Server Running on 7777 Port")
});


// Npm nodemon to refresh server automatically
// npm i -g nodemon => -g install for global level
// in package.json use below command so no need to use nodemon app.js instead npm run dev
// "scripts": {
//     "dev": "nodemon src/app.js"
// },