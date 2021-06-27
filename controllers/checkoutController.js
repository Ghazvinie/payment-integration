function checkout(req, res) {
    const basket = req.body;
    req.session.basket = basket;
    res.send({ redirect: 'purchase/checkout/basket' });
}

function basket(req, res) {
    const basket = req.session.basket;
    res.render('basket', { basket: basket, message: 'Your Basket' });
}

module.exports = { checkout, basket };