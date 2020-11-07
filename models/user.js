const mongoose=require("mongoose"),
Schema=mongoose.Schema;
var userSchema = new mongoose.Schema({
    fullName:String,
    address:String,
    image: String,
    contact:String,
    whatsapp:String,
    experience:String,
    skills:String,
    jobTitle:String,
    costHour:Number,
    googleID:String,
    username: String,
    reviews: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Review"
        }
     ],
    profile:{
        IDno:String,
    },
});
module.exports=mongoose.model("User", userSchema);