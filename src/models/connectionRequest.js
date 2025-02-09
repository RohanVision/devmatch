const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{value} incorrect status type`
        }
    }
}, {
    timestamps: true,
});

const ConnectionRequestModel = new mongoose.model("connectionRequest", connectionRequestSchema);
module.exports = ConnectionRequestModel;
