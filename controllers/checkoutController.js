const dotenv = require('dotenv').config();
.
// Saves basket to session and redirects user to the basket / payment method choice
function checkout(req, res) {
    const basket = req.body;
    req.session.basket = basket;
    res.json({ redirect: '/purchase/checkout/basket' });
}

// Renders the basket page using basket saved in session
function basket(req, res) {
    const basket = req.session.basket;
    res.render('basket', { basket: basket, message: 'Your Basket', key: process.env.STRIPE_PUBLISHABLE });
}

// Renders index page is user cancels checkout process
function paymentCancel(req, res){
    req.session.basket = null; // Set session basket to null
    res.render('index', { message: 'Payment cancelled' });
}

// Renders success page 
function paymentSuccess(req, res){
    req.session.basket = null; // Set session basket to null
    res.render('success');
}

module.exports = { checkout, basket, paymentCancel, paymentSuccess };