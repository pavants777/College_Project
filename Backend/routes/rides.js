// server/src/routes/rides.js
const express = require('express');
const Ride = require('../models/Ride');
const router = express.Router();

// Rider requests a ride
router.post('/request', async (req, res) => {
  const { rider, pickupLocation, dropoffLocation } = req.body;
  const ride = new Ride({ rider, pickupLocation, dropoffLocation });
  await ride.save();
  res.status(201).send(ride);
});

// Driver accepts a ride
router.patch('/:rideId/accept', async (req, res) => {
  const { driver } = req.body;
  const ride = await Ride.findByIdAndUpdate(req.params.rideId, { driver, status: 'Accepted' }, { new: true });
  res.send(ride);
});


module.exports = router;