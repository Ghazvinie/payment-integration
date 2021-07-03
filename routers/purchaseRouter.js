const purchaseRouter = require('express').Router();
const { createPaypalPayment, executePaypalPayment, cancelPaypalPayment } = require('../controllers/paypalController');
const { checkout, basket, paymentCancel } = require('../controllers/checkoutController');
const { stripeCheckout } = require('../controllers/stripeController');

purchaseRouter.post('/checkout', checkout);

purchaseRouter.get('/checkout/basket', basket);

purchaseRouter.get('/paypal', createPaypalPayment);

purchaseRouter.get('/paypal/success', executePaypalPayment);

purchaseRouter.get('/paypal/cancel', cancelPaypalPayment);

purchaseRouter.post('/stripe', stripeCheckout);

purchaseRouter.get('/stripe/cancel', paymentCancel);


module.exports = purchaseRouter;