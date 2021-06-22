const paypal = require('@paypal/checkout-server-sdk');
const dotenv = require('dotenv').config();

// Setup the Paypal SDK environment, access provided with credentials, clientId and clienSecret
function paypalEnvironment() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  return new paypal.core.SandboxEnvironment(
    clientId, clientSecret
  );

}

// Creates new Paypal HTTP client instance, used to invoke Paypal API
function paypalClient() {
  return new paypal.core.PayPalHttpClient(paypalEnvironment());
}


module.exports = {paypalEnvironment, paypalClient}