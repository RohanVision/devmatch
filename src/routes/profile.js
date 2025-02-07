const express = require('express');
const profileRouter = express.Router();

const { userAuth } = require('../middlewares/auth')
const { validateEditProfileData, validateEditPassword } = require('../utils/validation');


profileRouter.get('/profile/view', userAuth, async (req, res) => {
    try {
        const user = req.user; // find the user with the id
        res.send("Reading Cookie" + user)

    } catch (error) {
        res.status(400).send("Error : " + error.message)
    }
})

profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData) {
            throw new Error("Invalid Edit Request");
        }
        const loggedInuser = req.user;
        Object.keys(req.body).forEach(key => loggedInuser[key] = req.body[key]);

        await loggedInuser.save()
        // res.send(`${loggedInuser.firstName}, Edit was sucessfull`);
        res.json({
            message: `${loggedInuser.firstName}, Edit was sucessfull`,
            data: loggedInuser,
        })

    } catch (error) {
        res.status(400).send("Error : " + error.message)
    }
});

profileRouter.patch('/profile/password', userAuth, async (req, res) => {
    try {
        const loggedInuser = req.user; // Logged in user data

        // Get hashPassword from the function which is user input in Postman
        const hashPassword = await validateEditPassword(req);

        loggedInuser.password = hashPassword; // set hashPassword to loggedInuser

        await loggedInuser.save();
        res.send("Password Updated Sucessfully");

    } catch (error) {
        res.status(400).send("Error : " + error.message)
    }
})




module.exports = profileRouter;