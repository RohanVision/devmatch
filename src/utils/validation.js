const validatior = require('validator')


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

module.exports = {
    validateSignUpData
}