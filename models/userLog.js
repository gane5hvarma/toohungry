const mongoose=require("mongoose");
const schema=mongoose.Schema;
const userLogSchema=new schema({
  username:String,
  googleId:String,
  email:String,
  displayPictureUrl:String,
  mobile:Number,
  date:{type:Date,default:Date.now()},
  count:{type:Number,default:1}

})
const userModel=mongoose.model("userLogs",userLogSchema)
module.exports=userModel
