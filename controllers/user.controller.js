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
        if(req.session.error){
             res.render(path.join(__dirname, "../views/public/home.handlebars"), {
                 error: "login in through bits mail"
             });

            
        }
        else{
            res.render(path.join(__dirname, "../views/public/home.handlebars"));
            
        }
    }
 }
const logout=(req,res)=>{
    delete req.session.error;
    delete req.session.username;
    delete req.session.email;
    res.redirect("/");

}
module.exports={
    login:login,
    logout:logout
}