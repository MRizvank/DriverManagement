const express = require('express');
const router = express.Router();
const Driver = require('../models/Driver');
const Student = require('../models/Student');
const Route = require('../models/Route');
const Bus = require('../models/Bus');


// Driver login

router.post('/driver/login', async (req, res) => {
  try {
    const { username, password } = req.body; // You may need to implement proper authentication here

    // Assuming you have a username and password validation logic
    // Retrieve driver details including the assigned route
    const driver = await Driver.findOne({ username, password });
    
    if (!driver) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Retrieve students on the assigned route
    const students = await Student.find({ student_route_id: driver.assigned_route_id });

    res.json({ driver, students });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//Registering new driver 
router.post('/driver/register', async (req, res) => {
  try {
    
    const { driver_name, username, password,driver_id ,route_id } = req.body;

   
    // Check if the provided route_id exists
    const routeExists = await Route.findOne({ route_id: route_id });

    if (!routeExists) {
      res.status(400).json({ error: 'Invalid route ID' });
      return;
    }

    // Check if the provided username is unique
    const isUsernameUnique = await Driver.exists({ username });
    if (isUsernameUnique) {
      res.status(400).json({ error: 'Username already exists. Please choose a different username.' });
      return;
    }

    // Create a new driver
    const newDriver = new Driver({
      driver_name,
      driver_id,
      username,
      password,  // Note: You should hash the password before saving it in a real-world scenario
      assigned_route_id: route_id,
    });

    // Save the new driver to the database
    await newDriver.save();

    res.json({ driver: newDriver });
  } catch (error) {
    res.status(500).json({ error: error.message,mes:"dfsadf" });
  }
});


// Register a new driver and assign a bus
// router.post('/driver/register', async (req, res) => {
//   try {
//     const { driver_name, username, password, route_id, busNumber } = req.body;

//     // Check if the provided route_id exists
//     const routeExists = await Route.exists({ _id: route_id });
//     if (!routeExists) {
//       res.status(400).json({ error: 'Invalid route ID' });
//       return;
//     }

//     // Check if the provided username is unique
//     const isUsernameUnique = await Driver.exists({ username });
//     if (isUsernameUnique) {
//       res.status(400).json({ error: 'Username already exists. Please choose a different username.' });
//       return;
//     }

//     // Create a new driver
//     const newDriver = new Driver({
//       driver_name,
//       username,
//       password,  // Note: You should hash the password before saving it in a real-world scenario
//       assigned_route_id: route_id,
//     });

//     // Save the new driver to the database
//     await newDriver.save();

//     // Create a new bus and assign it to the driver
//     const newBus = new Bus({
//       busNumber,
//       bus_driverName: driver_name,
//       driver_id: newDriver._id,
//     });

//     // Save the new bus to the database
//     await newBus.save();

//     res.json({ driver: newDriver, bus: newBus });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });





// Other CRUD operations for drivers

module.exports = router;
