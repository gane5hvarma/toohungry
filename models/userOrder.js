var mongoose=require("mongoose");
var Schema=mongoose.Schema
var userOrdersSchema=new Schema({
    username:String,
    emailId:String,
    mobile:String,
    date:Date,
    orders:String
});
var userOrdersModel=mongoose.model("userOrders",userOrdersSchema);
module.exports=userOrdersModel