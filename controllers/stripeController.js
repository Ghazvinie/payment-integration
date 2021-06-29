const stripe = require('stripe')(process.env.STRIPE_SECRET);
const { createStripeItems } = require('../services/stripeServices');

async function stripeCheckout(req, res) {
  const basket = req.session.basket;
  const itemsArray = createStripeItems(basket);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: itemsArray,
    mode: 'payment',
    success_url: `http://localhost:3000/paysuccess`,
    cancel_url: `http://localhost:3000/paycancel`
  });
  console.log(session)
  res.json({ id: session.id });
}

module.exports = { stripeCheckout };