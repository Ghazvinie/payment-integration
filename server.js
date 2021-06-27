const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const paypal = require('paypal-rest-sdk');
// const {createPaymentJson, executePaymentJson} = require('./services/paypalServices');
const purchaseRouter = require('./routers/purchaseRouter');

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

app.use('/purchase', purchaseRouter);

// app.get('/paysuccess', (req, res) => {
//   const payerId = req.query.PayerID;
//   const paymentId = req.query.paymentId;

// const paymentJson = executePaymentJson(tempBasket, payerId);

//   paypal.payment.execute(paymentId, paymentJson, (error, payment) => {
//     if (error) {
//       console.log(error);
//     } else {
//       res.send('Success');
//       tempBasket = null;
//     }
//   });
// });
