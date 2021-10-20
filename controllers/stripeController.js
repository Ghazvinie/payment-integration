const stripe = require('stripe')(process.env.STRIPE_SECRET);
const { createStripeItems } = require('../services/stripeServices');

// Creates a Stripe session for user and executes the payment, sends back the session.id 
async function stripeCheckout(req, res) {
  const basket = req.session.basket;
  const itemsArray = createStripeItems(basket); // Creates an array of basket items for use with the .create() method
  const shippingRate = basket.delivery === 2.50 ? 'shr_1J9wvcInmADjXYb4zdqlHpQo' : 'shr_1J9wwQInmADjXYb4O0faeYDU'; // Selects the shipping rate code
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_rates: [shippingRate],
    shipping_address_collection: {
      allowed_countries: ['GB'],
    },
    line_items: itemsArray,
    mode: 'payment',
    success_url: `https://paypal-stripe-payment.herokuapp.com/purchase/success`, // Use for deploy
    cancel_url: `https://paypal-stripe-payment.herokuapp.com/purchase/cancel`
    // success_url: `http://localhost:3000/purchase/success`, // Use for development
    // cancel_url: `http://localhost:3000/purchase/cancel`
  });
  res.json({ id: session.id });
}

module.exports = { stripeCheckout };