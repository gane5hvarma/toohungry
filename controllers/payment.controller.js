
//instamojo payment gateway
// const Insta = require("instamojo-nodejs");
const request = require("request");

const createPayment=(req,res)=>{
    var headers = {
        'X-Api-Key': process.env.insta_key,
        'X-Auth-Token': process.env.insta_token
    }
    var payload = {
        purpose: 'TooHungry',
        amount: req.body.amount,
        buyer_name: req.session.username,
        redirect_url: 'http://localhost:3000/orderSuccess',
        send_email: true,
        // webhook: 'http://www.example.com/webhook/',
        // send_sms: true,
        email: req.session.email,
        allow_repeated_payments: false
    }

    request.post('https://www.instamojo.com/api/1.1/payment-requests/', {
        form: payload,
        headers: headers
    }, function (error, response, body) {
        
        if (!error && response.statusCode == 201) {
            var body=JSON.parse(body)
            res.send(body.payment_request.longurl)
        }
    })


}
module.exports={
    createPayment:createPayment
}