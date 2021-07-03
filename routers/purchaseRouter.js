const purchaseRouter = require('express').Router();
const { createPaypalPayment, executePaypalPayment, cancelPaypalPayment } = require('../controllers/paypalController');
const { checkout, basket, paymentCancel, paymentSuccess } = require('../controllers/checkoutController');
const { stripeCheckout } = require('../controllers/stripeController');

purchaseRouter.post('/checkout', checkout);

purchaseRouter.get('/checkout/basket', basket);

purchaseRouter.get('/paypal', createPaypalPayment);

purchaseRouter.get('/paypal/success', executePaypalPayment);

// purchaseRouter.get('/cancel', cancelPaypalPayment);

purchaseRouter.post('/stripe', stripeCheckout);

purchaseRouter.get('/cancel', paymentCancel);

purchaseRouter.get('/sucess', paymentSuccess)

module.exports = purchaseRouter;