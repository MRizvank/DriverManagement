const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busNumber: { type: String, required: true },
  bus_driverName: { type: String, required: true },
  driver_id: { type: String, ref: 'Driver' },
  bus_route_id:{type:String,required:true} 

});

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;
