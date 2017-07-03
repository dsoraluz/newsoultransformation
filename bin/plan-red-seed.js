const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const Plan = require('../models/plan-model.js');

const plan = [{
  planName: "Red",
  value: 1600.00,
  chargeAmount: 1664.00,
  fee: 64.00,
  duration: 30
}];

Plan.create(plan, (err, docs)=>{
  if(err){
    throw(err);
  }
  docs.forEach((plan)=>{
    console.log(`${plan.planName} ${plan.value} ${plan._id}`);
  });

  mongoose.disconnect();
});
