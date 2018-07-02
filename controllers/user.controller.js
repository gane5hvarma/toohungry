const path = require("path");
const _=require("underscore");
const login=(req,res)=>{
    if(!_.isEmpty(req.session.admin)){
        res.redirect("/admin");
    }
    else if(!_.isEmpty(req.session.username)){
        res.redirect("/restaurants");
    }

    else{
        res.status(200).sendFile(path.join(__dirname, "../views/public/home.html"));
    } 
}
const logut=(req,res)=>{

}
module.exports={
    login:login,
    logut:logut
}