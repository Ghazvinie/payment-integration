const dotenv = require('dotenv').config();
const paypalSdk = require('paypal-rest-sdk');

paypalSdk.configure({
    'host': 'api.sandbox.paypal.com',
    'port': '',
    'client_id': process.env.PAYPAL_CLIENT_ID,
    'client_secret': process.env.PAYPAL_CLIENT_SECRET
  });

  