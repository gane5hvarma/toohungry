const mongoose=require("mongoose");
const schema=mongoose.Schema;
const moment =require("moment")
const userLogSchema=new schema({
  username:String,
  googleId:String,
  email:String,
  displayPictureUrl:String,
  mobile:Number,
  firstLoginDate:{  
      type:Date
    },
  lastLoginDate :{
      type: Date
  },
  count:{type:Number,default:1}

})
const userModel=mongoose.model("userLogs",userLogSchema)
module.exports=userModel
