const mongoose = require("./connect");

var userSchema = {
    name: String,
    lastname: String,
    registerDate: Date,
    password: String,
    email: String
}
var USER = mongoose.model("user", userSchema);
module.exports = USER;