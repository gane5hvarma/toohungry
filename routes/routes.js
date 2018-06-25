var express=require("express");
var router=express.Router();
var path=require("path");
var mongoose=require("mongoose");
router.get("/", function (req, res) {
    if (req.session.username) {
        return res.render("../views/user.handlebars", {
            name: req.session.username
        })

    } else {
        console.log("asd")
        return res.sendFile(path.join(__dirname, "../views/public/home.html"));
    }
    // res.render("./public/index.html");
})
var restaurants=require("../models/restaurants");
router.get("/restaurants",function(req,res){

    var promise=restaurants.find().exec()
    promise.then(function(doc){
        return res.render(path.join(__dirname, "../views/restaurants.handlebars"),{
            restaurants: doc
        });

    })
router.get("/restaurants/:restaurant",function(req,res){
    res.render("items.handlebars"{
        items:items
    });
      
})
    
    
   

})
module.exports=router