# Node Payment Integration

## An app that allows a user to purchase items and pay with either PayPal or Stripe

This app solely focuses on the payment process. The user is able to add items to a basket and then decide a payment method. 
- The user adds items to a basket and selects a delivery type
- The basket displays the quantities, sub-total and total
- The user can then checkout and choose between paying with PayPal or Stripe
- Using PayPal the user is redirected to login to their account and pay with a chosen method
- Using Stripe the user inputs their card details to pay
- On successful completion the user is redirected to a success page

### Paying with PayPal:
- User selects PayPal and is redirected to a PayPal hosted payment page where they can login
- At the same time a PayPal payment is created using a create payment JSON object consisting of the purchase items and other relevant details
- Once the user logs in they are redirected to confirmation page
- On user approval the payment is executed using an execute payment JSON object
- On successful completion the user is redirected to a success page

### Paying with Stripe:
- At the basket page a stripe object is instantiated using the Stripe publishable key, this object is used for interaction with the Stripe API
- When the user selects Stripe they are redirected to a Stripe hosted payment page
- At the same time a Stripe session is created, the id property is used to identify the transaction
- The user inputs their card details and confirms payment
- On successful completion the user is redirected to a success page

### Built with:
- Node.js 14.18.1 / Express 4.17.1
- Paypal-Rest-Sdk 0.7.0
- Stripe 4.23.2

### To run:

```
$ npm install
```

```
$ npm run start
```

The app is now accessible from localhost:[YOUR_PORT]

You will need to provide the following keys:

```
process.env.PAYPAL_CLIENT_ID='YOUR_KEY'
process.env.PAYPAL_CLIENT_SECRET='YOUR_KEY'
process.env.STRIPE_SECRET='YOUR_KEY'
process.env.STRIPE_PUBLISHABLE='YOUR_KEY'
```

You will also need your own PayPal Sandbox accounts. 
Stripe test cards are available [here](https://stripe.com/docs/testing).

### Tests


### License 
