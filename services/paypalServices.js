// Creates JSON for PayPal payment creation
function createPaymentJson(basket) {
    const items = Object.keys(basket); // Get the items

    // Return array of items in correct format
    const itemsArray = items.reduce((acc, curr) => {
        if (curr !== 'delivery' && curr !== 'subTotal') {
            acc.push({
                'name': curr,
                'price': basket[curr].price,
                'currency': 'GBP',
                'quantity': basket[curr].quantity
            });
        }
        return acc;
    }, []);

    // Creates JSON object
    const paymentJson = {
        'intent': 'sale',
        'payer': {
            'payment_method': 'paypal'
        },
        'redirect_urls': {
            'return_url': 'http://localhost:3000/purchase/paypal/success',
            'cancel_url': 'http://localhost:3000/purchase/cancel'
        },
        'transactions': [{
            'amount': {
                'currency': 'GBP',
                'total': basket.subTotal + basket.delivery,
                'details': {
                    'shipping': basket.delivery,
                    'subtotal': basket.subTotal,
                }
            },
            'item_list': {
                'items': itemsArray
            }
        }]
    };
    return paymentJson;
}

// Creates JSON for PayPal payment execution
function executePaymentJson (basket, payerId) {
return {
    'payer_id': payerId,
    'transactions': [{
      'amount': {
        'currency': 'GBP',
        'total': basket.delivery + basket.subTotal
      }
    }]
  };
}

module.exports = { createPaymentJson, executePaymentJson };