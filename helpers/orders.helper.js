const _ = require("underscore");
const ordersModel=require("../models/userOrder");
const cartHelper=require("../helpers/cart.helper");
const saveOrder=(userEmail,cartItems)=>{
    return new Promise((resolve,reject)=>{
        const orders =new ordersModel({userEmail:userEmail,orders:cartItems})
        cartHelper.deleteCart(userEmail).then((data)=>{
             orders.save((err) => {
                 if (err) {
                     reject(err)
                 } else {
                     resolve("orders saved")
                 }
             })

        
        }).catch((err)=>{
            reject(err);
        })
       
    })
}
module.exports={
    saveOrder:saveOrder
}