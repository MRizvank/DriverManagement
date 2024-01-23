const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  route_id: { type: String, required: true, },
  route_name: { type: String, required: true },
},{versionKey:false});

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;
