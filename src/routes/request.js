const express = require('express');
const requestRouter = express.Router();

const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');

requestRouter.post('/request/send/:status/:toUserId', userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

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