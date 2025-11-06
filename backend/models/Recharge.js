const mongoose = require('mongoose');

const RechargeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  amount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Success', 'Failed'], default: 'Pending' },
  transactionId: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Recharge', RechargeSchema);
