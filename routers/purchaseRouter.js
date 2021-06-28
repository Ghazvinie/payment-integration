const purchaseRouter = require('express').Router();
const { createPaypalPayment, executePaypalPayment, cancelPaypalPayment } = require('../controllers/paypalController');
const { checkout, basket } = require('../controllers/checkoutController');

purchaseRouter.get('/paypal', createPaypalPayment);

purchaseRouter.get('/paypal/success', executePaypalPayment);

purchaseRouter.get('/paypal/cancel', cancelPaypalPayment);

purchaseRouter.post('/checkout', checkout);

purchaseRouter.get('/checkout/basket', basket);

module.exports = purchaseRouter;