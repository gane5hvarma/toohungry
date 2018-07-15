const restaurantsHelper=require("../helpers/restaurants.helper");
const cartHelper=require("../helpers/cart.helper");
const path=require("path");
const _ = require("underscore");

const display=(req,res)=>{
    restaurantsHelper.list().then((restaurantsData)=>{
        cartHelper.getCartQuantity(req.session.email).then((cartQuantity)=>{
            if (_.isEmpty(restaurantsData)) {
                res.send("no restaurants") // commit out after adding restaurants
            } else {
                console.log(cartQuantity)
                res.render(path.join(__dirname, "../views/restaurants.handlebars"), {
                    restaurants: restaurantsData,
                    cartQuantity:cartQuantity,
                    userEmail:req.session.email,
                    username:req.session.username,
                    userDisplayPicture:req.session.displayPictureUrl
                })
            }

        }).catch((err) => {
                    res.status(500).send("error in cart ");
        })
        
    }).catch((err)=>{
         res.status(500).send("error in restaurant");
    })
}
const itemsDisplay=(req,res)=>{
    restaurantsHelper.itemsList(req.params.restaurant).then((data)=>{
        cartHelper.getCartQuantity(req.session.email).then((cartQuantity) => {
            if(_.isEmpty(data)){
                res.send("no items in " + req.params.restaurant);
            }
            else{
                
                res.render(path.join(__dirname, "../views/items.handlebars"), {
                    items: data,
                    restaurantName:req.params.restaurant,
                    cartQuantity:cartQuantity
                })

            }
        }).catch((err) => {
            res.status(500).send("error in cart ");
        })
    }).catch((err)=>{
        res.status(500).send("error")
    })
}

module.exports={
    display:display,
    itemsDisplay:itemsDisplay
}