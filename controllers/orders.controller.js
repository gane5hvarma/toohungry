const path = require("path");
const ordersHelper=require("../helpers/orders.helper");
const cartHelper = require("../helpers/cart.helper");
const request = require("request")
const orderSuccess=(req,res)=>{
    res.redirect("/");    
}
const getOrders=(req,res)=>{
    ordersHelper.getOrder(req.session.email).then((data)=>{
        cartHelper.getCartQuantity(req.session.email).then((cartQuantity)=>{
            res.render(path.join(__dirname, "../views/orders.handlebars"), {
                orders: data.orders,
                cartQuantity:cartQuantity,
                userEmail: req.session.email,
                username: req.session.username,
                userDisplayPicture: req.session.displayPictureUrl
            })


        }).catch((err)=>{
            res.status(500).send("error in fetching cart quantity");
        })
         
    }).catch((err)=>{
        res.status(500).send("error in fetching orders");
    })
   
    
}
//change the logic for this controller

const saveOrder=(req,res)=>{
    console.log(req.body)
    if(req.body.status=="Credit"){
         cartHelper.getCartItems(req.body.buyer).then((cartItems) => {
            ordersHelper.saveOrder(req.body.buyer, cartItems.items).then((data) => {
                console.log(cartItems.items)
                res.status(200).send("ok");
            }).catch((err) => {
                res.status(500).send("error in converting cart to orders");
            })
        }).catch((err) => {
            res.status(500).send("error in fetching cart items");
        })
    }
}

module.exports={
    orderSuccess:orderSuccess,
    getOrders:getOrders,
    saveOrder:saveOrder
}