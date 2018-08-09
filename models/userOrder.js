var mongoose=require("mongoose");
var Schema=mongoose.Schema
const moment =require("moment")
var orderSchema=new Schema({
    itemName:String,
    restaurantName:String,
    itemCost:Number,
    itemType:String,
    itemImage:String,
    itemQuantity:Number

})
var userOrdersSchema=new Schema({
    userName:String,
    userEmail:String,
    mobile:Number,
    payment_id:String,
    payment_request_id:String,
    amount:String,
    feesChargedByInsta:String,
    date: {
        type: Date,
        default: moment()
    },
    orders:[orderSchema]
});
var userOrdersModel=mongoose.model("userOrders",userOrdersSchema);
module.exports=userOrdersModel