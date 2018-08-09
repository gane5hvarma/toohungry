const cartHelper = require('./../helpers/cart.helper');
const path=require("path");
const _ =require("underscore")

const getCartItems = (req, res) => {
    cartHelper.getCartItems(req.session.email).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
}
const saveCartItem=(req,res)=>{
    cartHelper.saveCartItem(req.body,req.session.email,req.session.username).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        res.status(500).send(err);
    });
}

const viewCartItems=(req,res)=>{
    cartHelper.getCartItems(req.session.email).then((data)=>{
        if(!_.isEmpty(data)){   
        cartHelper.getCartQuantity(req.session.email).then((cartQuantity) => {
           res.render(path.join(__dirname, "../views/cart.handlebars"),{
              cartItems:data.items,
              cartQuantity:cartQuantity,
              userEmail: req.session.email,
              username: req.session.username,
              userDisplayPicture: req.session.displayPictureUrl
            })
        }).catch((err)=>{
            res.status(500).send("error in viewing cart items");
        })
    }
    else{
         res.render(path.join(__dirname, "../views/cart.handlebars"), {
             cartQuantity:0,
             userEmail: req.session.email,
             username: req.session.username,
             userDisplayPicture: req.session.displayPictureUrl
         })
    }
    }).catch((err)=>{
         res.render(path.join(__dirname, "../views/cart.handlebars"), {
             userEmail: req.session.email,
             username: req.session.username,
             userDisplayPicture: req.session.displayPictureUrl
         })

    })
}
const removeItemInCart = (req, res) => {
   
    cartHelper.removeItemInCart(req.session.email,req.body).then((data)=>{
        res.send("succes");
    }).catch((err) => {
        res.status(500).send(err);
    })
    

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
    removeItemInCart: removeItemInCart,
    updateCartItemQuantity:updateCartItemQuantity
}