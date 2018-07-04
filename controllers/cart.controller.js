const cartHelper = require('./../helpers/cart.helper');

const display = (req, res) => {
    let promise = cartHelper.getItemsInCart(null);
    promise.then(cartItems => {
        res.render('cart', {
            cartItems: cartItems
        });
    }).catch(err => {
        console.log(err);
    });
};

module.exports = {
    display: display
}