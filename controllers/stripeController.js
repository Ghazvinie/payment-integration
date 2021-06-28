const stripe = require('stripe')(process.env.STRIPE_SECRET);

async function stripeCheckout(req, res) {
    console.log('mello')
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
            }]
    })
}

module.exports = { stripeCheckout }