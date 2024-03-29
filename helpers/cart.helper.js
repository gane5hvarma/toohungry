
const cart = require('./../models/cart.js');
const restaurant=require("./../models/restaurants.js");
const _=require("underscore");
const async=require("async");

const getCartItems = (userEmail) => {
    return new Promise((resolve,reject)=>{
        let query=cart.findOne({userEmail:userEmail})
        let promise=query.exec();
        promise.then((data)=>{
            console.log(data)
            resolve(data);
        }).catch((err)=>{
            reject(err);
        })
    })
}

const saveCartItem = (cartItem,userEmail,userName) => {
    return new Promise((resolve, reject) => {
        let restaurantQuery=restaurant.findOne({name:cartItem.restaurantName});
        let promise=restaurantQuery.exec();
        promise.then((restaurantData)=>{
            _.each(restaurantData.items,(itemData)=>{
                
                if(_.isEqual(itemData.itemName,cartItem.itemName)){
                    let cartItemData={
                        itemName:itemData.itemName,
                        itemCost:itemData.itemCost,
                        itemType:itemData.itemType,
                        itemImage:itemData.itemImage,
                        restaurantName:cartItem.restaurantName
                    }
                    console.log(cartItemData)
                    getCartItems(userEmail).then((data) => {
                        if(_.isEmpty(data)){

                            let cartItems=[]
                            cartItemData.itemQuantity=1;
                            cartItems.push(cartItemData);
                            new cart({userEmail:userEmail,userName:userName,items:cartItems}).save((err,data)=>{
                                if(err){
                                    reject(err);
                                }
                                else{
                                    resolve(data);
                                }
                            })
                        }
                        else{
                            let cartItems=data.items;
                            let result=_.findWhere(cartItems,{itemName:cartItemData.itemName})
                            if(_.isEmpty(result)){
                                cartItemData.itemQuantity=1
                                cartItems.push(cartItemData)
                            }
                            else{
                                let resultIndex=cartItems.indexOf(result)
                                cartItems[resultIndex].itemQuantity = result.itemQuantity+1;
                            }
            
                           
                            cart.update({userEmail:userEmail},{items:cartItems},(err,data)=>{
                                if(err){
                                    reject(err);
                                }
                                else{
                                    resolve(data);
                                }
                            });
                        }
                    })
                }
            })
        })
    })
}
const updateCartItemQunatity = (cartItem, userEmail) => {
    return new Promise((resolve, reject) => {
        let cartQuery = cart.findOne({userEmail:userEmail})
        let promise = cartQuery.exec();
        promise.then((cartData) => {
            let cartItems=cartData.items;
            let result = _.findWhere(cartItems, {
                itemName: cartItem.itemName
            })
            let resultIndex=cartItems.indexOf(result)
            cartItems[resultIndex].itemQuantity = cartItem.itemQuantity;
             cart.update({userEmail:userEmail},{items:cartItems},(err,data)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(data);
                }
            });
           
        })
    })
}


const getCartQuantity=(userEmail)=>{
    return new Promise((resolve,reject)=>{
        let cartQuery=cart.findOne({userEmail:userEmail});
        let promise=cartQuery.exec();
        let CartQuantity=0;
        promise.then((data)=>{
            if(data==null){
                resolve(CartQuantity);
            }
            else{
                async.forEach(data.items,(item,callback)=>{
                    CartQuantity=CartQuantity+item.itemQuantity;
                    callback();
                },()=>{
                    resolve(CartQuantity);
                })
            }

            
        }).catch((err)=>{
            reject(err);
        })
    })
}

const removeItemInCart=(userEmail,body)=>{
    return new Promise((resolve,reject)=>{
        let cartQuery=cart.findOne({userEmail:userEmail});
        let promise=cartQuery.exec();
        promise.then((data)=>{
            let items=data.items;
            let updatedItems=_.reject(items,(item)=>{
                if(item.itemName==body.itemName && item.restaurantName== body.restaurantName){
                    return item
                }
            })
            cart.update({userEmail:userEmail},{items:updatedItems},(err,data)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(data);
                }
            });
        }).catch((err)=>{
            reject(err);
        })
    })
}
const deleteCart=(userEmail)=>{
    return new Promise((resolve,reject)=>{
        cart.deleteOne({userEmail:userEmail},(err)=>{
            if(err){
                reject(err);
            }
            else{
                resolve("items deleted in cart")
            }
        })

    })
}
const getCartItemsCost=(userEmail)=>{
    return new Promise((resolve,reject)=>{
        let query=cart.findOne({userEmail:userEmail});
        let promise=query.exec();
        promise.then((data)=>{
            let cost=0;
            _.each(data.items,(item)=>{
                let costPerItem=item.itemQuantity * item.itemCost;
                cost=cost+costPerItem;
            })
            let deliveryCost=0;
            let defaultDeliveryCost = 35;
            let deliveryCostThroughItemsCost =cost*8/100;
            if(defaultDeliveryCost>=deliveryCostThroughItemsCost){
                deliveryCost=defaultDeliveryCost;
            }
            else{
                deliveryCost=deliveryCostThroughItemsCost;
            }
       
            let totalCost=cost + Math.round(deliveryCost) + Math.round(cost/20) ;//charges including delivery charges 50 rs and gst - 5%


            resolve(Math.round(totalCost))
        }).catch((err)=>{
            reject(err);
        })
    })
}

module.exports = {
    getCartItems: getCartItems,
    saveCartItem:saveCartItem,
    getCartQuantity:getCartQuantity,
    updateCartItemQunatity:updateCartItemQunatity,
    removeItemInCart:removeItemInCart,
    deleteCart:deleteCart,
    getCartItemsCost:getCartItemsCost
}