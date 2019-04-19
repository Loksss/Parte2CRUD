const mongoose = require('mongoose');
mongoose.connect("mongodb://172.18.0.2:27017/math");
module.exports = mongoose;