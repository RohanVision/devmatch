const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require('../models/connectionRequest');
const User = require("../models/user");
const USER_SAFE_DATA = "firstName lastName skills about"

// Get all the pending connection request for the loogged in User
userRouter.get('/user/request/received', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", USER_SAFE_DATA)

        res.json({
            message: "Data Fetched Sucessfully",
            data: connectionRequest,
        })

    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
})


userRouter.get("/user/connection", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id, status: 'accepted' },
                { toUserId: loggedInUser._id, status: 'accepted' }
            ]
        }).populate("fromUserId", USER_SAFE_DATA)

        // Map on each row of fromUserId data
        const data = connectionRequest.map((row) => {
            if (row.fromUserId.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.json({ data });

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
})


userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;

        const connectionRequest = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        });

        const hideUsersFromFeed = new Set();
        connectionRequest.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });

        const users = await User.find({
            $and: [
                {
                    _id: { $nin: Array.from(hideUsersFromFeed) }
                },
                {
                    _id: { $ne: loggedInUser._id },
                }
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit)

        res.send(users)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = userRouter;