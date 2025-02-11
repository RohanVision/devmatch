const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require('../models/connectionRequest')

userRouter.get('/user/request/received', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", "firstName  lastName")

        res.json({
            message: "Data Fetched Sucessfully",
            data: connectionRequest,
        })

    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
})

module.exports = userRouter;