const mongoose = require("mongoose");
const validator = require("validator")

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        maxLength: 4,
        validate(value) {
            if (validator.isEmpty(value)) {
                throw new Error("FirstName cannot be empty")
            }
        }
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid " + value)
            }
        }
    },
    password: {
        type: String,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Passowrd is not valid " + value)
            }
        }
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


