function createStripeItems(basket) {
  const items = Object.keys(basket);
  const itemsArray = items.reduce((acc, curr) => {
    if (curr !== 'delivery' && curr !== 'subTotal') {
      acc.push({
        price_data: {
          currency: 'gbp',
          product_data: {
            name: basket[curr]
          },
          unit_amount: basket[curr].price,
        },
        quantity: basket[curr].quantity,
      });
    }
    return acc;
  }, []);
}

module.exports = { createStripeItems }
