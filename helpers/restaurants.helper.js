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
module.exports={
    list:list
}