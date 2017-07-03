const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planSchema = new Schema({
  planName: String,
  value: Number,
  chargeAmount: Number,
  fee: Number,
  duration: Number
},{
  timestamps: true
});

const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;
