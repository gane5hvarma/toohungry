const restaurantsHelper=require("../helpers/restaurants.helper");
const path=require("path");
const _ = require("underscore");
const display=(req,res)=>{
    restaurantsHelper.list().then((data)=>{
        if(_.isEmpty(data)){
            res.send("no restaurants")
        }    // commit out after adding restaurants
        else{    
            console.log("sd")
            
          
            res.render(path.join(__dirname, "../views/restaurants.handlebars"), {
                restaurants: data
            })
        }
    }).catch((err)=>{
         res.status(500).send("error really");
    })
    

}

module.exports={
    display:display
}