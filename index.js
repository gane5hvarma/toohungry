const express=require("express");
const path=require("path")
const app=express();
const port=process.env.PORT||3000;
require("dotenv").config();


// database connection
const mongoose=require("mongoose")
const db_connection = process.env.db_connection || "mongodb://localhost:27017/toohungry";
mongoose.connect(db_connection);

const credentials=require("./config/credentials.js")

//static files
app.use(express.static(path.join(__dirname,"views")))
app.use(express.static(__dirname))

app.use(express.static(path.join(__dirname, "views/public")))


//view engine handlebars
var hbs=require("express-handlebars")
app.set('views', path.join(__dirname));
app.engine("handlebars",hbs({defaultLayout: null}))
app.set("view engine","handlebars")

var expressSession=require("express-session")
//body-parser
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:false}))


app.use(expressSession({
  secret: process.env.cookie_secretKey || credentials.cookie.secretKey
}))



//auth route
const auth = require('./routes/auth'); //auth route
app.use("/auth",auth);
//adminRoutes
const adminRoutes= require("./admin/routes");
app.use("/admin",adminRoutes);
//routes
const routes=require("./routes/routes");
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
