const dotenv = require('dotenv').config();

function checkout(req, res) {
    const basket = req.body;
    req.session.basket = basket;
    res.json({ redirect: '/purchase/checkout/basket' });
}

function basket(req, res) {
    const basket = req.session.basket;
    res.render('basket', { basket: basket, message: 'Your Basket', key: process.env.STRIPE_PUBLISHABLE });
}

function paymentCancel(req, res){
    res.render('index', { message: 'Payment cancelled' });
}

function paymentSucess(req, res){
    res.render('success')
}

module.exports = { checkout, basket, paymentCancel, paymentSucess };