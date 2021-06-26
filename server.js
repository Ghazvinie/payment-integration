const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const paypal = require('paypal-rest-sdk')

// Express app
const app = express();

paypal.configure({
  'mode': 'sandbox',
  'client_id': process.env.PAYPAL_CLIENT_ID,
  'client_secret': process.env.PAYPAL_CLIENT_SECRET
});

// Connect to DB and server listen
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log('Connected to the database...');
    app.listen(3000, () => console.log('Server is listening on port 3000...'));
  })
  .catch(error => console.log('Database connection error' + error));

// Express session
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true
}));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set view engine
app.set('views', './public/views');
app.set('view engine', 'ejs');

// Set static files
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/ban', (req, res) => {
  res.send('helloo');
})

app.post('/pay', (req, res) => {

  const basket = req.body;
  const items = Object.keys(basket);
  const itemsArray = items.reduce((acc, curr) => {
    if (curr !== 'delivery' && curr !== 'subTotal') {
      acc.push(    {
        "name": curr,
        "price": basket[curr].price,
        "currency": "GBP",
        "quantity": basket[curr].quantity
      });
    }


    return acc;
  }, []);

  //  itemsArray.forEach(item => console.log(item))
  const create_payment_json = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": "http://localhost:3000/paysuccess",
      "cancel_url": "http://localhost:3000/paycancel"
    },
    "transactions": [{
      "item_list": {
        "items": itemsArray
      },
      "amount": {
        "currency": "GBP",
        "total": basket.subTotal
      },
      "description": "This is the payment description."
    }]
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {

      for (let i = 0; i < payment.links.length; i++){
        if (payment.links[i].rel === 'approval_url'){
          res.json({forwardLink: payment.links[i].href});
        }
      }
    }
  });
});

app.get('/paysuccess', (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
      "amount": {
        "currency": "GBP",
        "total": "1.00"
      }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
      console.log(error.response);
      throw error;
    } else {
      res.send('Success');
    }
  });
});
