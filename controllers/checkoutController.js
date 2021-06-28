const dotenv = require('dotenv').config();

function checkout(req, res) {
    const basket = req.body;
    req.session.basket = basket;
    res.send({ redirect: '/purchase/checkout/basket' });
}

function basket(req, res) {
    const basket = req.session.basket;
    if (!basket) {
        res.redirect('/');
    }
    res.render('basket', { basket: basket, message: 'Your Basket', key: process.env.PUBLISHABLE_KEY });
    req.session.basket = null;
}

module.exports = { checkout, basket };