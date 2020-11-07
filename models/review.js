var mongoose = require("mongoose");
Schema=mongoose.Schema;
var reviewSchema = new mongoose.Schema({
    text: String,
    author: String
});

module.exports = mongoose.model("Review", reviewSchema);