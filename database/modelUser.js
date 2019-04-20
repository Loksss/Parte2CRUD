const mongoose = require("./connect");

var userSchema = {
    name: String,
    lastname: String,
    address: String,
    age: Number,
    nickname: String,
    password: String,
    registerDate: Date,
    updateDate: Date
}
var USER = mongoose.model("user", userSchema);
module.exports = USER;