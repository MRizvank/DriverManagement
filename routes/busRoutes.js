const express = require('express');
const router = express.Router();
const Bus = require('../models/Bus');

// Update bus details, including driver assignment
router.put('/bus/:busNumber', async (req, res) => {
  try {
    const { driver_id, bus_driverName } = req.body;
    const { busNumber } = req.params;

    // Update bus details, including driver assignment
    await Bus.findByIdAndUpdate(busNumber, {
      driver_id,
      bus_driverName,
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Other CRUD operations for buses

module.exports = router;
