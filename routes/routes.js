const express=require("express");
const router=express.Router();
const path=require("path");
const mongoose=require("mongoose");
const user=require("../controllers/user.controller.js");
const restaurants=require("../controllers/restaurants.controller.js");
const rest=require("../models/restaurants")
const _= require("underscore");
const cart = require('./../controllers/cart.controller');
const payment = require('./../controllers/payment.controller');
//user routes
router.get("/",user.login);

//user handler what this does is it make sures only bits ppl can enter any route after /
router.use((req,res,next) => {
    if (!_.isEmpty(req.session.username)) {
        next()
    } else {
        if(_.isEmpty(req.session.admin)){
            res.sendFile(path.join(__dirname,"../views/public/404.html"));
        }
        else{
            res.send("you cant access the normal user facilites because you'r an admin :p,will add this functionality later");
        }
    }
});
//need to write fuction for this,not yet written
router.get("/logout",user.logout);
//restaurant routess
router.get("/restaurants",restaurants.display);
router.get("/restaurants/:restaurant",restaurants.itemsDisplay);

//cart routes
router.post('/saveCartItem', cart.saveCartItem);
router.get("/getCartItems",cart.getCartItems);
router.get("/viewCartItems",cart.viewCartItems);

router.post("/removeItemInCart",cart.removeItemInCart);
router.post("/updateCartItemQuantity",cart.updateCartItemQuantity);
router.post("/createPayment",payment.createPayment);
   

module.exports=router