const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const Student = require('../models/Student');
const Route = require('../models/Route');
const Driver = require('../models/Driver');
const Attendance = require('../models/Attendance')

// Register a new student
router.post('/student/register', async (req, res) => {
  try {
    const { student_name, student_busNumber, student_route_id, student_username } = req.body;

    const existingStudent = await Student.findOne({ student_username });

    if (existingStudent) {
      return res.status(409).json({ message: "Student id alredy registerd or username already exists." });
    }

    // Check if the provided route_id exists
    const routeExists = await Route.exists({ route_id: student_route_id });

    if (!routeExists) {
      res.status(400).json({ error: 'Invalid route ID' });
      return;
    }

    // Create a new student
    const newStudent = new Student({
      student_name,
      student_busNumber,
      student_route_id: student_route_id,
      student_username
    });

    // Save the new student to the database
    await newStudent.save();

    res.status(201).json({ student: newStudent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//attendance
router.get('/student/:studentId/', async (req, res) => {

  try {
    const { studentId } = req.params;
    const { month, year } = req.query;
    // console.log(studentId,month,year);
    const isIdvalid = mongoose.Types.ObjectId.isValid(studentId);
    if (!isIdvalid) {
      return res.status(404).json({ message: "please provide a valid student ID" })
    }

    //checking provided student exist in the system or not 
    const existingStudent = await Student.findById({ _id: studentId });
    if (!existingStudent) {
      return res.status(404).json({ message: "The student id provided does not exist in our system " })
    }

    const attendanceData = await Attendance.find({
      student_id: studentId,
      ...(month ? { month: month } : {}),  // Include month if provided
      ...(year ? { year: year } : {})
    });
    res.json({ attendanceData })



  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
