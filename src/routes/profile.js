const express = require('express');
const profileRouter = express.Router();

const { userAuth } = require('../middlewares/auth')

profileRouter.get('/profile', userAuth, async (req, res) => {
    try {
        const user = req.user; // find the user with the id
        res.send("Reading Cookie" + user)

    } catch (error) {
        res.status(400).send("Error : " + error.message)
    }
})


module.exports = profileRouter;