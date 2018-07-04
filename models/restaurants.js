var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var itemSchema=new Schema({
    itemName:String,
    itemType:String,
    itemPicture:String,
    itemCost:Number
  
})
var restaurantSchema=new Schema({
    name:String,
    address:String,
    mobile:Number,
    picture:String,
    items:[itemSchema]
});
var restaurantModel=mongoose.model("restaurants",restaurantSchema);
module.exports=restaurantModel;
