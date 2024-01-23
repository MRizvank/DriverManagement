const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const Driver=require('../models/Driver');



// Endpoint to mark a new attendance
router.post('/:studentId/attendance', async (req, res) => {
    try {
      const {  driverId, attendanceStatus, year, month, day } = req.body;
      const {studentId}=req.params;
  
      const attendanceDate = new Date(`${year}-${month}-${day}`);
      // console.log(attendanceDate.getMonth() + 1);
      const isStudentValid= await Student.findById({_id : studentId})
      // console.log(isStudentValid.student_route_id);
      if(!isStudentValid){
        return res.status(404).json({message:"Student is not found"})
      }
      
      // Check if the driver exists and has the permission to update student attendance
      const isDriverAuthorized = await Driver.exists({ driver_id: driverId, assigned_route_id: isStudentValid.student_route_id });
       
      if (!isDriverAuthorized) {
        res.status(403).json({ error: 'Unauthorized. Driver does not have permission to update student attendance.' });
        return;
      }
      
      // Check if attendance for the same day and student already exists
      const existingAttendance = await Attendance.findOne({
        student_id: studentId,
        attendance_date: attendanceDate,
      }).exec();
  
      if (existingAttendance) {
        return res.status(409).json({ error: 'Attendance already marked for the same day and student' });
      }
  
      // Create a new attendance record
      const newAttendance = new Attendance({
        student_id: studentId,
        driver_id: driverId,
        attendance_date: attendanceDate,
        attendance_status: attendanceStatus,
        month: month,
        year: year,
      });
  
      // Save the new attendance record to the database
      await newAttendance.save();
  
      res.status(201).json({ message: 'Attendance marked successfully' });
    } catch (error) {
      console.error('Error marking attendance:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  
  module.exports=router;