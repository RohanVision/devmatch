const express = require('express');
const requestRouter = express.Router();

const { userAuth } = require('../middlewares/auth')

requestRouter.post('/sendingConnectionRequest', userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user.firstName + "send request")
    } catch (error) {
        res.status(400).send("Error : " + error.message);
    }
})


module.exports = requestRouter;