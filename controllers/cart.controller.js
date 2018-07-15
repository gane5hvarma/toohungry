const cartHelper = require('./../helpers/cart.helper');
const path=require("path")

const getCartItems = (req, res) => {
    cartHelper.getCartItems(req.session.email).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
}
const saveCartItem=(req,res)=>{
    console.log(req.body)
    cartHelper.saveCartItem(req.body,req.session.email).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        res.status(500).send(err);
    });
}

const viewCartItems=(req,res)=>{
    cartHelper.getCartItems(req.session.email).then((data)=>{
        cartHelper.getCartQuantity(req.session.email).then((cartQuantity) => {
           res.render(path.join(__dirname, "../views/cart.handlebars"),{
              cartItems:data.items,
              cartQuantity:cartQuantity
            })
        }).catch((err)=>{
            res.send(err);
        })
    })
}
const removeCartItem=(req,res)=>{
    res.send("sd")

}
const updateCartItemQuantity=(req,res)=>{
    cartHelper.updateCartItemQunatity(req.body,req.session.email).then((data)=>{
        res.send("success")
    }).catch((err)=>{
        res.status(500).send(err);
    });

}
module.exports = {
    getCartItems: getCartItems,
    saveCartItem:saveCartItem,
    viewCartItems:viewCartItems,
    removeCartItem:removeCartItem,
    updateCartItemQuantity:updateCartItemQuantity
}