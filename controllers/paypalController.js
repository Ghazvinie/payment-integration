const paypal = require('paypal-rest-sdk');
const { createPaymentJson, executePaymentJson } = require('../services/paypalServices');


function createPaypalPayment(req, res, next) {
    const basket = req.session.basket;
    const paymentJson = createPaymentJson(basket);

    paypal.payment.create(paymentJson, (error, payment) => {
        if (error) {
            console.log(error);
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });
}

function executePaypalPayment(req, res) {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const basket = req.session.basket;

    const paymentJson = executePaymentJson(basket, payerId);

    paypal.payment.execute(paymentId, paymentJson, (error, payment) => {
        if (error) {
            console.log(error);
        } else {
            if (payment.httpStatusCode === 200) {
                res.render('success', { payment });
                req.session.basket = null;
            } else {
                res.render('index', { message: 'Payment not successful' });
            }
        }
    });
}

function cancelPaypalPayment(req, res) {
    res.render('index', { message: 'Payment cancelled' });
}

module.exports = { createPaypalPayment, executePaypalPayment, cancelPaypalPayment };