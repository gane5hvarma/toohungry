
//instamojo payment gateway
// const Insta = require("instamojo-nodejs");
const request = require("request");

const createPayment=(req,res)=>{
    console.log(req.body)
    var headers = {
        'X-Api-Key': process.env.insta_key,
        'X-Auth-Token': process.env.insta_token
    }
    var payload = {
        purpose: 'TooHungry',
        amount: req.body.amount,
        buyer_name: req.session.username,
        redirect_url: 'http://toohungry.in/orderSuccess',
        send_email: false,
        webhook: 'http://toohungry.in/saveOrder',
        send_sms: false,
        email: req.session.email,
        allow_repeated_payments: false
    }

    request.post('https://www.instamojo.com/api/1.1/payment-requests/', {
        form: payload,
        headers: headers
    }, function (error, response, body) {
        
        if (!error && response.statusCode == 201) {
            var body=JSON.parse(body)
            console.log(body)
            res.send(body.payment_request.longurl)
        }
        else{
            console.log(response)
            console.log("in error");
            console.log(error);
        }
    })


}
const paymentSuccessDetails=(req,res)=>{
    console.log(req.body);
}
module.exports={
    createPayment:createPayment,
    paymentSuccessDetails: paymentSuccessDetails
}