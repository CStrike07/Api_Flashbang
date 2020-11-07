const mongoose=require("mongoose"),
Schema=mongoose.Schema;
var buySchema = new mongoose.Schema({
    fullName:String,
    address:String,
    image: String,
    contact:String,
    whatsapp:String,
    googleID:String,
    username: String,
    profile:{
        IDno:String,
    },
});
module.exports=mongoose.model("Buy", buySchema);