const mongoose=require("mongoose"),
Schema=mongoose.Schema;
var userSchema = new mongoose.Schema({
    googleID:String,
    username: String,
    profile:{
        firstName:String,
        lastName:String,
        IDno:String,
    },
});
module.exports=mongoose.model("User", userSchema);