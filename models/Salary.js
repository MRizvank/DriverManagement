const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
  salary_amount: { type: Number, required: true },
  driver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
});

const Salary = mongoose.model('Salary', salarySchema);

module.exports = Salary;
