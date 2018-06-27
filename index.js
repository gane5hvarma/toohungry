const express=require("express");
var path=require("path")
const app=express();
var port=3000
var passport=require("passport")
// database connection
var mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/toohungry")

var credentials=require("./config/credentials.js")

//static files
app.use(express.static(path.join(__dirname,"views")))
app.use(express.static(path.join(__dirname, "views/public")))


//view engine handlebars
var hbs=require("express-handlebars")
app.set('views', path.join(__dirname));
app.engine("handlebars",hbs({defaultLayout: null}))
app.set("view engine","handlebars")

var expressSession=require("express-session")


app.use(expressSession({
  secret:credentials.cookie.secretKey
}))



//auth route
var auth = require('./routes/auth'); //auth route
app.use("/auth",auth);
//routes
var routes=require("./routes/routes");
app.use("/",routes);










//404 -catch all handler this middleware should be atlast
app.use(function(req,res,next){
  res.sendFile(path.join(__dirname,'./views/public/404.html'))
})
app.listen(port,function(err){
  if(err){
    console.log(err)
    }
  else{
    console.log("server is running at" + port)
  }
});
