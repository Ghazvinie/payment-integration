// Creates an array of items formatted for Stripe checkout
function createStripeItems(basket) {
  const items = Object.keys(basket);
  const itemsArray = items.reduce((acc, curr) => {
    if (curr !== 'delivery' && curr !== 'subTotal') {
      acc.push({
        price_data: {
          currency: 'gbp',
          product_data: {
            name: curr
          },
          unit_amount: basket[curr].price * 100,
        },
        quantity: basket[curr].quantity,
      });
    }
    return acc;
  }, []);
  return itemsArray;
}

module.exports = { createStripeItems };