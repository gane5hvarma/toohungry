var mongoose=require("mongoose");
var Schema=mongoose.Schema
var orderSchema=new Schema({
    itemName:String,
    restaurant:String,
    itemCost:Number,
    itemType:String,
    itemPicture:String

})
var userOrdersSchema=new Schema({
    username:String,
    emailId:String,
    mobile:Number,
    verfied:Boolean,
    date: {
        type: Date,
        default: Date.now()
    },
    orders:[orderSchema]
});
var userOrdersModel=mongoose.model("userOrders",userOrdersSchema);
module.exports=userOrdersModel