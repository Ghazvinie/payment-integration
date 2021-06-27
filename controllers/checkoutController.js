function checkout(req, res) {
    const basket = req.body;
    console.log(basket);
}

module.exports = { checkout };