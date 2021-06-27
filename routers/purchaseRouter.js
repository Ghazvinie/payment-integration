const purchaseRouter = require('express').Router();
const { createPaypalPayment, executePaypalPayment, cancelPaypalPayment } = require('../controllers/paypalController');

purchaseRouter.post('/paypal', createPaypalPayment);

purchaseRouter.get('/paypal/success', executePaypalPayment);

purchaseRouter.get('/paypal/cancel', cancelPaypalPayment);

module.exports = purchaseRouter;