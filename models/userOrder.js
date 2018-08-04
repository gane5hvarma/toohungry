var mongoose=require("mongoose");
var Schema=mongoose.Schema
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
    verfied:Boolean,
    date: {
        type: Date,
        default: Date.now()
    },
    orders:[orderSchema]
});
var userOrdersModel=mongoose.model("userOrders",userOrdersSchema);
module.exports=userOrdersModel