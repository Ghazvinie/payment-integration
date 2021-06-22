const create_payment_json = {
  "intent": "sale",
  "payer": {
      "payment_method": "paypal"
  },
  "redirect_urls": {
      "return_url": "http://localhost:3000/paysuccess",
      "cancel_url": "http://localhost:3000/paycancel"
  },
  "transactions": [{
      "item_list": {
          "items": [{
              "name": "item",
              "sku": "item",
              "price": "1.00",
              "currency": "GBP",
              "quantity": 1
          }]
      },
      "amount": {
          "currency": "USD",
          "total": "1.00"
      },
      "description": "This is the payment description."
  }]
};

paypal.payment.create(create_payment_json, function (error, payment) {
  if (error) {
      throw error;
  } else {
      console.log("Create Payment Response");
      console.log(payment);
  }
});