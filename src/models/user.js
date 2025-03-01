const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        minLength: 4,
        maxLength: 15,
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
        unique: true,
        trim: true,
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
        enum: {
            values: ['male', 'female', 'other'],
            message: `{VALUE} not valid gender type`
        }
        // validate(value) {
        //     if (!['male', 'female', 'others'].includes(value)) {
        //         throw new Error("Gender is not valid")
        //     }
        // },
    },
    about: {
        type: String,
        default: 'This is default about text'
    },
    skills: {
        type: [String]
    },
    photoUrl: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },
}, {
    timestamps: true,
})


// Always user normal function instead of arrow else 'this' will not work
userSchema.methods.getJWT = async function () {
    const user = this;
    // Create JWT Token once email and password is valid and hide data(userId) and secret key
    const token = await jwt.sign({ _id: user._id }, "Dev@1234", { expiresIn: '1hr' })

    return token
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);

    return isPasswordValid;
}

module.exports = mongoose.model("User", userSchema)

/******* OR We can explicitly define like below **********/

// const User = new mongoose.model("User", userSchema);
// module.exports = User;


