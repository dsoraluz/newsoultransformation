const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const Plan = require('../models/plan-model.js');

const plan = [{
  planName: "Blue",
  value: 0.10,
  fee: 0.02,
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
