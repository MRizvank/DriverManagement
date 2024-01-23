const express = require('express');
const mongoose = require('mongoose');
const driverRoutes = require('./routes/driverRoutes');
const studentRoutes = require('./routes/studentRoutes');
const busRoutes = require('./routes/busRoutes');
const routeRoutes = require('./routes/routeRoutes');
const salaryRoutes = require('./routes/salaryRoutes');
const attendanceRoutes=require('./routes/attendanceRoutes')

const app = express();
const PORT = process.env.PORT || 3000;

// mongoose.connect('mongodb://localhost:27017/bus_management', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb://localhost:27017/bus_management_test', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

// Use routes here
app.use('/api', driverRoutes);
app.use('/api', studentRoutes);
app.use('/api', busRoutes);
app.use('/api', routeRoutes);
app.use('/api', salaryRoutes);
app.use('/api', attendanceRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
  });

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
