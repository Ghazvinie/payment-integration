const paypal = require('paypal-rest-sdk');
const { createPaymentJson, executePaymentJson } = require('../services/paypalServices');


function createPaypalPayment(req, res, next) {
    const basket = req.body;
    // tempBasket = basket;
    const paymentJson = createPaymentJson(basket);


    paypal.payment.create(paymentJson, (error, payment) => {
        if (error) {
            console.log(error);
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.json({ forwardLink: payment.links[i].href });
                }
            }
        }
    });
}

function executePaypalPayment(req, res, next) {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
  
  const paymentJson = executePaymentJson(tempBasket, payerId);
  
    paypal.payment.execute(paymentId, paymentJson, (error, payment) => {
      if (error) {
        console.log(error);
      } else {
        res.send('Success');
        // tempBasket = null;
      }
    });
}

module.exports = { createPaypalPayment, executePaypalPayment };