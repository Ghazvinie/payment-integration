const purchaseRouter = require('express').Router();
const { createPaypalPayment, executePaypalPayment } = require('../controllers/paypalController');

purchaseRouter.post('/paypal', createPaypalPayment);

purchaseRouter.get('/paypal/success', executePaypalPayment);

module.exports = purchaseRouter;