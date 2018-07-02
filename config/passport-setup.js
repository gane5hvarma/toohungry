var passport=require("passport")
var googleStrategy=require('passport-google-oauth').OAuth2Strategy;
var mongoose=require("mongoose")
var mongodb=require("mongodb")
var express=require("express")
var User=require("../models/userLog.js")
var credentials=require("./credentials.js")


//google auth
passport.use(new googleStrategy({
  clientID: process.env.google_clientID || credentials.google.clientID,
  clientSecret: process.env.google_clientSecret || credentials.google.clientSecret,
  callbackURL: process.env.google_callbackURL || credentials.google.callbackURL
},function(accessToken,refreshToken,profile,done){

    if(profile._json.domain==="hyderabad.bits-pilani.ac.in"){
      if(profile.emails[0].value==="f20150284@hyderabad.bits-pilani.ac.in"){
        done(null,"admin");
      }
      User.findOne({googleId:profile.id},function(err,user){
        
        if(user){
          
          user.count=user.count+1;
          user.save((err,updatedUser)=>{
            done(null,updatedUser)
          })
        }
        else{
          new User({
            username:profile.displayName,
            googleId:profile.id,
            email:profile.emails[0].value,
            displayPicture:profile.photos[0].value,
            date:new Date()
          }).save().then(function(newUser){
            done(null,newUser)
          })
        }

      })
    }
    else{
    
      done(null,"Not_BitsHyd")
    }

  }
)
);
