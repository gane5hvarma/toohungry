const restaurantsHelper=require("../helpers/restaurants.helper");
const _ = require("underscore");
const display=(req,res)=>{
    restaurantsHelper.list().then((data)=>{
        if(_.isEmpty(data)){
            res.send("no restaurants")
        }    // commit out after adding restaurants    
         res.render(path.join(__dirname, "../views/restaurants.handlebars"), {
             restaurants: data.name
         })
    }).catch((err)=>{
         res.status(500).send("error");
    })
    

}

module.exports={
    display:display
}