const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    itemName: String,
    itemType: String,
    itemPicture: String,
    itemCost: Number,
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'restaurants'
    }
});

const itemModel = mongoose.model('Item', itemSchema);

module.exports = itemModel;
