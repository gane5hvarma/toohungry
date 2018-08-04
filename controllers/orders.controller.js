const path = require("path");
const ordersHelper=require("../helpers/orders.helper");
const cartHelper = require("../helpers/cart.helper");
const request = require("request")
const orderSuccess=(req,res)=>{
    res.redirect("/");    
}
const getOrders=(req,res)=>{
    res.send("uour orders are safe")
}
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