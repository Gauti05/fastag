const express = require('express');
const auth = require('../middleware/auth');
const Recharge = require('../models/Recharge');
const Vehicle = require('../models/Vehicle');
const router = express.Router();

router.post('/', auth, async (req, res) => {
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

    const recharge = new Recharge({
      user: req.user,
      vehicle: vehicleId,
      amount,
      paymentStatus: 'Success',
      transactionId: `TXN${Date.now()}`
    });
    await recharge.save();
    res.status(201).json(recharge);
  } catch (error) {
    console.error('Error creating recharge:', error);  
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const recharges = await Recharge.find({ user: req.user }).populate('vehicle');
      console.log('Recharges fetched:', JSON.stringify(recharges, null, 2))
    res.json(recharges);
  } catch (error) {
    console.error('Error fetching recharges:', error);  
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
