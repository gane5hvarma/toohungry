var fs=require("fs");
data=fs.readFileSync("./views/public/images/restaurants/dominos.jpg")
var buff=new Buffer(data,"base64")
