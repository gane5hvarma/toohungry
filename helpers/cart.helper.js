const userLog = require('./../models/userLog');
const Item = require('./../models/items');

const getItemsInCart = (userId) => {
    let query;
    if(userId === null) {
        query = userLog.find();
    } else {
        query = userLog.findById(userId);
    }
    let promise = query.populate({
        path: 'cartItems',
        populate : {
            path: 'restaurant'
        }
    }).exec();
    return new Promise((resolve, reject) => {
        promise.then((data) => {
            resolve(data[0].cartItems);
        }).catch((err) => {
            reject(err);
        });
    });
}

module.exports = {
    getItemsInCart: getItemsInCart
}