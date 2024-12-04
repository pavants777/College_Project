// server/src/routes/payments.js
const express = require('express');
const stripe = require('stripe')('your-stripe-secret-key');
const router = express.Router();

router.post('/checkout', async (req, res) => {
  const { amount, currency } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // Convert to cents
    currency,
  });
  res.send({ clientSecret: paymentIntent.client_secret });
});
