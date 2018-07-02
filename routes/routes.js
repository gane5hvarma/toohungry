const express=require("express");
const router=express.Router();
const path=require("path");
const mongoose=require("mongoose");
const user=require("../controllers/user.controller.js");
const restaurants=require("../controllers/restaurants.controller.js");

router.get("/",user.login);
router.get("/logout",user.logut);
router.get("/restaurants",restaurants.display);

router.get("/restaurants/:restaurant",function(req,res){
    let promise=restaurant.find({name:req.params.restaurant}).exec();
    promise.then(function(doc){
        res.render(path.join(__dirname, "../views/items.handlebars"), {
            items: doc.items
            }
         );

    }).catch((err)=>{
        res.send("error")
    })
    
      
})
    
    
   

module.exports=router