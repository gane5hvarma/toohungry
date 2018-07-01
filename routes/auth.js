var passport=require("passport")
var express=require("express")
var router=express.Router()

var app=express()



var passportStrategy=require('../config/passport-setup.js')

router.get("/google",passport.authenticate('google',{
  scope:['profile','email']
}))
router.get("/google/redirect",passport.authenticate('google',{
    failureRedirect:"/auth/google",

    session:false
    }),function(req,res){
        req.session.username=req.user.username
        if(req.user==="Not_BitsHyd"){
          res.redirect("/");
        }
        else if(req.user==="admin"){
          res.redirect("/admin");
        }
        else{
          res.redirect("/restaurants");
        }
      }
      );

module.exports=router

