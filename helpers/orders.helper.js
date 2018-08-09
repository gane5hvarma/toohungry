const _ = require("underscore");
const ordersModel=require("../models/userOrder");
const cartHelper=require("../helpers/cart.helper");
const moment=require("moment");
//change url of this route
const saveOrder=(data,cartItems)=>{
    return new Promise((resolve,reject)=>{
        userEmail=data.buyer;
        let query=ordersModel.find({userEmail:data.buyer});
        let promise=query.exec()
        promise.then((orders)=>{
             let todaysOrder = _.find(orders, (order) => {
                 return moment(order.date, "DD-MM-YYYY").format("DD-MM-YYYY") == moment().format("DD-MM-YYYY");
             })
            if(!_.isEmpty(todaysOrder)){
                todaysOrderArray=todaysOrder.orders
                _.forEach(cartItems,(cartItem)=>{
                    todaysOrderArray.push(cartItem);
                })
                 cartHelper.deleteCart(userEmail).then((data) => {
                     ordersModel.update({userEmail:userEmail},{orders:todaysOrderArray},(err) => {
                         if (err) {
                             reject(err)
                         } else {
                             resolve("orders saved")
                         }
                     })


                 }).catch((err) => {
                     reject(err);
                 })
            }
            else{
                 const orders = new ordersModel({
                     userEmail: data.buyer,
                     userName:data.buyer_name,
                     mobile:data.buyer_phone,
                     payment_id:data.payment_id,
                     payment_request_id:data.payment_request_id,
                     amount:data.amount,
                     feesChargedByInsta:data.fees,
                     orders: cartItems
                 })
                 cartHelper.deleteCart(userEmail).then((data) => {
                     orders.save((err) => {
                         if (err) {
                             reject(err)
                         } else {
                             resolve("orders saved")
                         }
                     })


                 }).catch((err) => {
                     reject(err);
                 })

            }
        })
       
       
    })
}
const getOrder = (userEmail)=>{
    return new Promise((resolve,reject)=>{
        let query=ordersModel.find({userEmail:userEmail});
        let promise=query.exec();
        promise.then((orders)=>{

           let todaysOrder= _.find(orders,(order)=>{
             
                return moment(order.date,"DD-MM-YYYY").format("DD-MM-YYYY")===moment().format("DD-MM-YYYY");
            })
            console.log(todaysOrder)
            if(!_.isEmpty(todaysOrder)){

                resolve(todaysOrder);
            }
            else{
                todaysOrder=[]
                resolve(todaysOrder);
            }
        }).catch((err)=>{
            reject(err);
        })

    })
}
module.exports={
    saveOrder:saveOrder,
    getOrder:getOrder
}