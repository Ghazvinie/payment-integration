const paypal = require('paypal-rest-sdk');
const { createPaymentJson, executePaymentJson } = require('../services/paypalServices');

// Creates the PayPal payment
function createPaypalPayment(req, res, next) {
    const basket = req.session.basket;
    const paymentJson = createPaymentJson(basket); // Creates JSON for use with the .create()

    paypal.payment.create(paymentJson, (error, payment) => {
        if (error) {
            console.log(error);
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') { 
                    res.redirect(payment.links[i].href); // Redirects if payment has been approved
                }
            }
        }
    });
}

// Executes the PayPal payment after the payment has been created
function executePaypalPayment(req, res) {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const basket = req.session.basket;

    const paymentJson = executePaymentJson(basket, payerId); // Creates JSON for use with the .execute()

    paypal.payment.execute(paymentId, paymentJson, (error, payment) => {
        if (error) {
            console.log(error);
        } else {
            if (payment.httpStatusCode === 200) {
                res.render('success', { payment }); // Renders success on successful payment
                req.session.basket = null; // Reset session basket to null
            } else {
                res.render('index', { message: 'Payment not successful' });
            }
        }
    });
}

module.exports = { createPaypalPayment, executePaypalPayment };