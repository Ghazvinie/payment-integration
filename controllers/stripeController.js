const stripe = require('stripe')(process.env.STRIPE_SECRET);
const {createStripeItems} = require('../services/stripeServices');

async function stripeCheckout(req, res) {
  const basket = req.session.basket;
  const itemsArray = createStripeItems(basket)
    const session = await stripe.checkout.sessions.create({

        payment_method_types: ['card'],
    
        line_items: [
    
          {
    
            price_data: {
    
              currency: 'usd',
    
              product_data: {
    
                name: 'Stubborn Attachments',
    
                images: ['https://i.imgur.com/EHyR2nP.png'],
    
              },
    
              unit_amount: 2000,
    
            },
    
            quantity: 1,
    
          },
    
        ],
    
        mode: 'payment',
    
        success_url: `http://localhost:3000/paysuccess`,
    
        cancel_url: `http://localhost:3000/paycancel`,
    
      });
    
      res.json({ id: session.id });
}

module.exports = { stripeCheckout };