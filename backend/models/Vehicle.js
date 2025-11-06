const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  registrationNumber: { type: String, required: true, unique: true, uppercase: true, trim: true },
  fastagId: { type: String, required: true, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', VehicleSchema);
