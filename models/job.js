var mongoose = require("mongoose");
Schema=mongoose.Schema;
var jobSchema = new mongoose.Schema({
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    companey: String,
    location: String,
    address: String,
    contactNo: String,
    email: String,
    title: String,
    description: String,
    salary: String,
    requirements: String,
    applyLink:String
});

module.exports = mongoose.model("Job", jobSchema);