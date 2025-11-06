const express = require('express');
const auth = require('../middleware/auth');
const Vehicle = require('../models/Vehicle');
const router = express.Router();


router.post('/', auth, async (req, res) => {
  const { registrationNumber, fastagId } = req.body;
  try {
    const existingVehicle = await Vehicle.findOne({ registrationNumber: registrationNumber.toUpperCase() });
    if (existingVehicle) return res.status(400).json({ message: 'Vehicle already added' });

    const vehicle = new Vehicle({ user: req.user, registrationNumber: registrationNumber.toUpperCase(), fastagId });
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ user: req.user });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
