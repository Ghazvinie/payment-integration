function createPaymentJson(basket) {


    const items = Object.keys(basket);
    const itemsArray = items.reduce((acc, curr) => {
        if (curr !== 'delivery' && curr !== 'subTotal') {
            acc.push({
                "name": curr,
                "price": basket[curr].price,
                "currency": "GBP",
                "quantity": basket[curr].quantity
            });
        }


        return acc;
    }, []);

    const paymentJson = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/paysuccess",
            "cancel_url": "http://localhost:3000/paycancel"
        },
        "transactions": [{
            "amount": {
                "currency": "GBP",
                "total": basket.subTotal + basket.delivery,
                "details": {
                    "shipping": basket.delivery,
                    "subtotal": basket.subTotal,
                }
            },
            "item_list": {
                "items": itemsArray
            },

            "description": "This is the payment description."
        }]
    };
    return paymentJson;
}

module.exports = { createPaymentJson };