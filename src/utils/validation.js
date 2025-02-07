const validator = require('validator')
const bcrypt = require('bcrypt');

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is not valid")
    } else if (firstName.length < 4 || firstName.length > 15) {
        throw new Error("Please provide valid First Name between 4 to 15 charcters long")
    } else if (lastName.length < 3 || lastName.length > 15) {
        throw new Error("Please provide valid Last Name between 2 to 15 charcters long")
    } else if (!validatior.isEmail(emailId)) {
        throw new Error("Please provide valid Email")
    } else if (!validatior.isStrongPassword(password)) {
        throw new Error("Password must be valid")
    }
}


const validateEditProfileData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "emailId", "age", "about", "skills", "gender"];

    const isEditAllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field));

    const { age, about } = req.body
    if (age < 18 || age > 50) {
        throw new Error("Please enter valid age")
    } else if (!validator.isLength(about, { min: 0, max: 30 })) {
        throw new Error("About must be between 0 and 30 characters long");
    }

    return isEditAllowed;
}

const validateEditPassword = async (req) => {
    const { password } = req.body;
    // check password is valid and password length
    if (!password || password.length < 6) {
        throw new Error("Please provide valid password with 6 charcter long");
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error("Password much contain Uppercase, LowerCase, and number");
    }

    return await bcrypt.hash(password, 10)
}

module.exports = {
    validateSignUpData,
    validateEditProfileData,
    validateEditPassword
}