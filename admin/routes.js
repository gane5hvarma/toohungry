const express=require("express");
const router=express.Router();
const path=require("path");
const _=require("underscore");
const restaurants = require("../models/restaurants");
router.use((req,res,next)=>{
    console.log(req.session)
    if(_.isEmpty(req.session.admin)){
        console.log("not an admin")
        res.sendFile(path.join(__dirname, '../views/public/404.html'))
    }
    else{
        next();
    }
})

router.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"/public/admin.html"));
});

router.get("/addRestaurants",(req,res)=>{
    res.sendFile(path.join(__dirname, "/public/addRestaurants.html"));
});
router.post("/addRestaurants",(req,res)=>{
    console.log(req.body)
    new restaurants({name:req.body.name,address:req.body.address,mobile:req.body.mobile})
    .save()
    .then((restaurant)=>{
        res.send("succesfull added " + restaurant.name + "to database go back and add another restaurant");
    }).catch((err)=>{
        console.log(err);
        res.send("might be problem with database connection go back and try again");
    });
    

});
router.get("/listRestaurants",(req,res)=>{
    restaurants.find(function(err,data){
        res.send(data);
    })
    
})
router.get("/deleteRestaurants",(req,res)=>{

});
router.get("/addItems",(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/addItems.html"));

});
router.post("/addItems",(req,res)=>{
    restaurants.findOne((err,data)=>{
        if(err){
            res.send("cant find restaurant");
        }
        else{
            let restaurant=req.body.name;
            let itemDetails={
                itemName:req.body.itemName,
                itemType:req.body.itemType,
                itemCost:req.body.itemCost
            }
            data.items=data.items.push(itemDetails)
            restaurants.update({name:restaurant},{items:data.items},(err,data)=>{
              
                if(err){
                    res.send("didnt update items in restaurant go back and try again");
                }
                else{
                    res.send("added item succesfully go back and update again");
                }
            })
        }
    })
})

module.exports=router;