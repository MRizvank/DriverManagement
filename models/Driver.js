const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  driver_id: { type: String, required: true, unique: true },
  driver_name: { type: String, required: true },
  assigned_route_id: { type: String, ref: 'Route' },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { versionKey: false });

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
