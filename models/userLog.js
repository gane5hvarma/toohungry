var mongoose=require("mongoose");
var schema=mongoose.Schema;
var userLogSchema=new schema({
  username:String,
  googleId:String,
  email:String,
  displayPicture:String,
  mobile:String,
  date:{type:Date,default:Date.now()},
  count:{type:Number,default:1}

})
var userModel=mongoose.model("userLogs",userLogSchema)
module.exports=userModel
