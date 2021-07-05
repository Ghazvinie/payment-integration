const stripe = require('stripe')(process.env.STRIPE_SECRET);
const { createStripeItems } = require('../services/stripeServices');

// Creates a Stripe session for user and executes the payment, sends back the session.id 
async function stripeCheckout(req, res) {
  const basket = req.session.basket;
  const itemsArray = createStripeItems(basket); // Creates an array of basket items for user with the .create() method

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: itemsArray,
    mode: 'payment',
    success_url: `http://localhost:3000/purchase/success`,
    cancel_url: `http://localhost:3000/purchase/cancel`
  });
  res.json({ id: session.id });
}

module.exports = { stripeCheckout };