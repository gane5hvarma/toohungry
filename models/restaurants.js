var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var itemSchema=new Schema({
    itemName:String,
    itemType:String,
    itemImage:String,
    itemCost:Number,
    itemClicks:Number

  
})
var restaurantSchema=new Schema({
    name:String,
    address:String,
    mobile:Number,
    image:String,
    restaurantClicks:Number,
    items:[itemSchema]
});
var restaurantModel=mongoose.model("restaurants",restaurantSchema);
module.exports=restaurantModel;
