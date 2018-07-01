const path = require("path");
const login=(req,res)=>{
    
    res.status(200).sendFile(path.join(__dirname, "../views/public/home.html"));
    
}
const logut=(req,res)=>{

}
module.exports={
    login:login,
    logut:logut
}