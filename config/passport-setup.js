var passport=require("passport")
var googleStrategy=require('passport-google-oauth').OAuth2Strategy;
var mongoose=require("mongoose")
var mongodb=require("mongodb")
var express=require("express")
var User=require("../models/userLog.js")
var credentials=require("./credentials.js")
// passport.serializeUser(function(user,done){
//   done(null,user.id)
// })
// passport.deserializeUser(function(id,done){
//   User.findById(id,function(err,user){
//     done(null.user.id)
//   })
//
// })

//google auth
passport.use(new googleStrategy({
  clientID:credentials.google.clientID,
  clientSecret:credentials.google.clientSecret,
  callbackURL:credentials.google.callbackURL
},function(accessToken,refreshToken,profile,done){

    if(profile._json.domain==="hyderabad.bits-pilani.ac.in")
      User.findOne({googleId:profile.id},function(err,user){
        if(user){
          user.count=user.count+1;
          done(null,user)
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
    else{
      console.log("not a bits-pilani user")
      done(null,"Not_BitsHyd")
    }

  }
  )
);
