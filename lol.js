// this api gives you list of categories
const async=require("async")
const json=require("json-simple");
var arr=['sad','dasd','asdasd'];
var lol=function(data){
  return new Promise(function(resolve,reject){
    let dat=data+'a'
    resolve(dat)
  });


}
const _=require("underscore")
var arr="as".split(",")
console.log(gg)
console.log(!_.isEmpty(gg))
var lila="[nan,sa]";
lila.replaceAt("[","")

console.log(typeof((lila)))
console.log(lila.includes()
let daata=[]
var gg=async.forEach(lila,function(data,callback){
  lol(data).then(function(data){
    // console.log(data)
    daata.push(data)
    console.log(daata)
    callback("aed");
  })
},function(err, x){
  console.log(err)
  console.log("X", daata);
})
