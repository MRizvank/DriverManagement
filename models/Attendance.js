const mongoose = require('mongoose');

// ATTENDANCE SCHEMA
const attendanceSchema = new mongoose.Schema({
    student_id: { type: String, ref: 'Student', required: true },
    driver_id: { type: String, ref: 'Driver', required: true },
    attendance_date: { type: String, required: true },
    attendance_status: { type: Boolean, default:false},
    month: { type: String, required: true },
    year: { type: Number, required: true }, 
  },{versionKey:false});
  
  // Create the model
  const Attendance = mongoose.model('Attendance', attendanceSchema);
  
  module.exports =   Attendance;
  
  