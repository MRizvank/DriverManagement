const mongoose = require('mongoose');

// STUDENT SCHEMA
const studentSchema = new mongoose.Schema({
  student_name: { type: String, required: true },
  student_busNumber: { type: String, required: true },
  student_route_id:{type:Number,required:true}
});

// BUS SCHEMA
const busSchema = new mongoose.Schema({
  busNumber: { type: String, required: true },
  bus_driver_id: {type:String,required:true},
  bus_route_id:{type:Number,required:true}
});

// DRIVER SCHEMA
const driverSchema = new mongoose.Schema({
    driver_id: { type: String, required: true, unique: true },
    driver_name: { type: String, required: true },
    assigned_route_id: { type:  Number, ref: 'Route' },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  }, { versionKey: false });

// ROUTE SCHEMA
const routeSchema = new mongoose.Schema({
  route_name: { type: String, required: true },
  route_id:{type:Number,required:true}
});

// SALARY SCHEMA
const salarySchema = new mongoose.Schema({
  driver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
  salary_amount: { type: Number, required: true },
});

// ATTENDANCE SCHEMA
const attendanceSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  driver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
  attendance_date: { type: Date, required: true },
  attendance_status: { type:Boolean, default:false,required: true },
  month: { type: String, required: true },
  year: { type: Number, required: true },
});

// Create models based on the schemas
const Student = mongoose.model('Student', studentSchema);
const Bus = mongoose.model('Bus', busSchema);
const Driver = mongoose.model('Driver', driverSchema);
const Route = mongoose.model('Route', routeSchema);
const Salary = mongoose.model('Salary', salarySchema);
const Attendance = mongoose.model('Attendance', attendanceSchema);


module.exports = {
    Student,
    Bus,
    Driver,
    Route,
    Salary,
    Attendance,
  };