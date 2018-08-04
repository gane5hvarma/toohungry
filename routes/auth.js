
var express=require("express")
var router=express.Router()
const passport = require("passport")
const passportStrategy=require('../config/passport-setup.js')
const _= require("underscore");

router.get("/google",(req,res,next)=>{
  if(_.isEmpty(req.session.username)){
    next();
  }
  else{
    res.redirect("/restaurants");
  }
},passport.authenticate('google',{
  scope:['profile','email']
}));


router.get("/google/redirect",(req,res,next)=>{
  if (_.isEmpty(req.session.username)) {
    if(_.isEmpty(req.session.admin)){
      next();
    }
    else{
      delete req.session.admin;
      next();
    }
  }
  else {
    delete req.session.username;
    next();
    
  }
  

  },passport.authenticate('google',{
    failureRedirect:"/auth/google",

    session:false
    }),function(req,res){
        req.session.username=req.user.username
        req.session.email=req.user.email
        req.session.displayPictureUrl=req.user.displayPictureUrl
        if(req.user==="Not_BitsHyd"){
          req.session.error=true;
          res.redirect("/");
        }
        else{
          if(req.user==="admin"){
            // console.log("im here in admin")
            req.session.admin="admin"
            res.redirect("/admin");
          }
          else{
            // console.log("im not in admin")
            res.redirect("/restaurants");
          }
        }
      }
      );

module.exports=router

