const purchaseRouter = require('express').Router();
const { createPaypalPayment, executePaypalPayment } = require('../controllers/paypalController');
const { checkout, basket, paymentCancel, paymentSuccess } = require('../controllers/checkoutController');
const { stripeCheckout } = require('../controllers/stripeController');

purchaseRouter.post('/checkout', checkout);

purchaseRouter.get('/checkout/basket', basket);

purchaseRouter.get('/paypal', createPaypalPayment);

purchaseRouter.get('/paypal/success', executePaypalPayment);

purchaseRouter.post('/stripe', stripeCheckout);

purchaseRouter.get('/cancel', paymentCancel);

purchaseRouter.get('/success', paymentSuccess);

module.exports = purchaseRouter;