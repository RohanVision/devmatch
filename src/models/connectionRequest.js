const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    formUserId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    status: {
        type: String,
        enum: {
            values: ["igonored", "intersted", "accepted", "rejected"],
            message: `{value} incorrect status type`
        }
    }
}, {
    timestamps: true,
});

const ConnectionRequestModel = new mongoose.model("connectionRequest", connectionRequestSchema);
module.exports = ConnectionRequestModel;
