const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
    itemName: String,
    itemType: String,
    itemImage: String,
    itemCost: Number,
    restaurantName:String,
    itemQuantity:Number

});
const cartSchema=new Schema({
    userEmail:String,
    items:[cartItemSchema]
})
const cartModel = mongoose.model('userCart', cartSchema);

module.exports = cartModel;
