// backend/routes/location.js
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

const locationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  timestamp: { type: Date, default: Date.now }
});

const Location = mongoose.model('Location', locationSchema);

router.post('/save-location', async (req, res) => {
  const { latitude, longitude } = req.body;

  try {
    const newLocation = new Location({ latitude, longitude });
    await newLocation.save();

    res.status(201).json({ message: 'Location saved successfully' });
  } catch (error) {
    console.error('Error saving location:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
