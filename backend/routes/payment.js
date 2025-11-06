const express = require('express');
const Stripe = require('stripe');
require("dotenv").config();
const auth = require('../middleware/auth');
const Recharge = require('../models/Recharge');
const Vehicle = require('../models/Vehicle');

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 

router.post('/create-payment-intent', auth, async (req, res) => {
  const { vehicleId, amount } = req.body;

  try {
    if (!vehicleId || !amount) {
      return res.status(400).json({ message: 'Vehicle ID and amount are required' });
    }

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    if (vehicle.user.toString() !== req.user) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'inr',
      payment_method_types: ['card'],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
   
    res.status(500).json({ message: 'Payment intent creation failed' });
  }
});

router.post('/confirm-payment', auth, async (req, res) => {
  const { vehicleId, amount, paymentIntentId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ message: 'Payment not successful' });
    }

    const recharge = new Recharge({
      user: req.user,
      vehicle: vehicleId,
      amount,
      paymentStatus: 'Success',
      transactionId: paymentIntentId,
    });

    await recharge.save();
    res.status(201).json(recharge);
  } catch (error) {
  
    res.status(500).json({ message: 'Payment confirmation failed' });
  }
});

module.exports = router;
