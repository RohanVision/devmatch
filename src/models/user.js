const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        maxLength: 4,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        // This will work for only new document
        validate(value) {
            if (!['male', 'female', 'others'].includes(value)) {
                throw new Error("Gender is not valid")
            }
        },
    },
    about: {
        type: String,
        default: 'This is defaul about text'
    },
    skills: {
        type: [String]
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model("User", userSchema)

// OR We can explicitly define like belo

// const User = mongoose.model("User", userSchema);

// module.exports = User;


