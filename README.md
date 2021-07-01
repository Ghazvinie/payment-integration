# Node Payment Integration

## An app that allows a user to purchase items and pay with either PayPal or Stripe

The app allows a user to to add items to a basket, before deciding to checkout with either PayPal or Stripe.
- The user can add items to a basket and select a delivery type
- The basket displays the quantities, sub-total and total
- The user can then checkout and choose between paying with PayPal or Stripe
- Using PayPal the user is redirected to login to their account and pay with a chosen method
- Using Stripe the user inputs their card details to pay
- On successful completion the user is redirected to a success page

### Built with:
- JavaScript
- NodeJs 16.1.0 / Express 4.17.1
- HTML / CSS

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


### Tests


### License 
