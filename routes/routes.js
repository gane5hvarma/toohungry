const express=require("express");
const router=express.Router();
const path=require("path");
const mongoose=require("mongoose");
const user=require("../controllers/user.controller.js");
const restaurants=require("../controllers/restaurants.controller.js");
const _= require("underscore");
const cart = require('./../controllers/cart.controller');

router.get("/",user.login);

router.use((req,res,next) => {
    if (!_.isEmpty(req.session.username)) {
        next()
    } else {
        res.send("you cant access the normal user facilites because you'r an admin :p,will add this functionality later");
    }
});

router.get("/logout",user.logut);

router.get("/restaurants",restaurants.display);

router.get("/restaurants/:restaurant",function(req,res){
    let promise=restaurant.find({name:req.params.restaurant}).exec();
    promise.then(function(doc){
        res.render(path.join(__dirname, "../views/items.handlebars"), {
            items: doc.items
            }
         );
    }) 
});

router.get('/cart', cart.display);
    
   

module.exports=router