const purchaseRouter = require('express').Router();
const { createPaypalPayment, executePaypalPayment, cancelPaypalPayment } = require('../controllers/paypalController');
const { checkout } = require('../controllers/checkoutController');

purchaseRouter.post('/paypal', createPaypalPayment);

purchaseRouter.get('/paypal/success', executePaypalPayment);

purchaseRouter.get('/paypal/cancel', cancelPaypalPayment);

purchaseRouter.post('/checkout', checkout);

module.exports = purchaseRouter;