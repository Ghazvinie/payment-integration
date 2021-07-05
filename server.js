const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const paypal = require('paypal-rest-sdk');
const purchaseRouter = require('./routers/purchaseRouter');

// Express app
const app = express();

// Connect to DB and server listen
app.listen(3000, () => console.log('Server is listening on port 3000...'));

// PayPal configuration
paypal.configure({
  'mode': 'sandbox',
  'client_id': process.env.PAYPAL_CLIENT_ID,
  'client_secret': process.env.PAYPAL_CLIENT_SECRET
});

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

// Root route
app.get('/', (req, res) => {
  res.render('index');
});

// Purchase router
app.use('/purchase', purchaseRouter);