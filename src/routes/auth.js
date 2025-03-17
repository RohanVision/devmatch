const express = require('express');
const authRouter = express.Router();

const User = require('../models/user');
const { validateSignUpData } = require('../utils/validation');
const bcrypt = require('bcrypt');


// creating new instance of user model reading the data we receive from end user (POSTMAN, BROWSER) by req.body(API)
authRouter.post("/signup", async (req, res) => {
    try {
        //validation of data which comes from Request
        validateSignUpData(req);

        const { firstName, lastName, emailId, password } = req.body;
        // Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);

        // Creating New User Instance
        const user = new User({
            firstName, lastName, emailId, password: passwordHash
        });

        const savedUser = await user.save(); // Saving the new user model

        const token = await savedUser.getJWT();
        res.cookie("token", token, { expires: new Date(Date.now() + 900000), httpOnly: true });

        res.json({ message: "User Data added", data: savedUser });
    } catch (error) {
        res.status(400).send("Error : " + error.message)
    }
});

// Login User
authRouter.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            throw new Error("Email ID is not present in database")
        }

        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {
            const token = await user.getJWT();
            // Add Token to Cookie and send the response(token) to user
            res.cookie("token", token, { expires: new Date(Date.now() + 900000), httpOnly: true });
            res.send(user);

        } else {
            throw new Error("Password doesn't match")
        }

    } catch (error) {
        res.status(400).send("Error : " + error.message)
    }
});

// Logout User
authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.send("Logout Sucessfull");
})

module.exports = authRouter;