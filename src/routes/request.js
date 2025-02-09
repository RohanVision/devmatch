const express = require('express');
const requestRouter = express.Router();

const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require("../models/user")

requestRouter.post('/request/send/:status/:toUserId', userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["interested", "ignored"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).send({ message: "Status in invalid: " + status })
        }

        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(400).send({ message: "User not Found" })
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ],
        });
        if (existingConnectionRequest) {
            return res.status(400).send({ message: "Connection Request already present" })
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })

        const data = await connectionRequest.save();
        res.json({
            message: `Connection Request Send to user`,
            data
        })
    } catch (error) {
        res.status(400).send("Error : " + error.message);
    }
})


module.exports = requestRouter;