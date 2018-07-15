const restaurants = require("../models/restaurants");

const list=()=>{
    return new Promise((resolve,reject)=>{
        let query=restaurants.find();
        let promise=query.exec();
        promise.then((doc)=>{

            return resolve(doc);
        }).catch((err)=>{
         
            return reject(err);
        })
    })
}
const itemsList=(restaurant)=>{
    return new Promise((resolve,reject)=>{
        let query=restaurants.findOne({name:restaurant});
        let promise=query.exec();
        promise.then((data)=>{
            return resolve(data.items)
        }).catch((err)=>{
            return reject(err);
        })
    })
}
module.exports={
    list:list,
    itemsList:itemsList
}