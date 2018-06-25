var mongoose=require("mongoose");
var schema=mongoose.Schema;
var userLogSchema=new schema({
  username:String,
  googleId:String,
  email:String,
  displayPicture:String,
  date:{type:Date,default:Date.now()}

})
var userModel=mongoose.model("userLogs",userLogSchema)
module.exports=userModel
