const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

});

module.exports = mongoose.model("User", userSchema);

// OR We can explicitly define like belo

// const User = mongoose.model("User", userSchema);

// module.exports = User;
