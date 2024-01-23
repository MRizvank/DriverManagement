const express = require('express');
const router = express.Router();
const Route = require('../models/Route');

// CRUD operations for routes

router.post('/register-route', async (req, res) => {
    try {
        const { route_id, route_name } = req.body;
        const existingRoute = await Route.findOne({ route_id });

        if (existingRoute) {
            // console.log(`Route with ID ${route_id} already exists.`);
            return res.status(409).json({message:"Route is Alredy Registerd! please choose a new one"})
        }
        //Registering A new Route
        const newRoute = new Route({
            route_id,
            route_name
        });
        // Save the route to the database
        await newRoute.save();
        // console.log('Route registered successfully.');
        res.json({message:"Route registered successfully.",success:true})


    } catch (error) {

    }
})

module.exports = router;
