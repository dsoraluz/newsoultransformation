// const express = require('express');
// const Plan = require('../models/plan-model');
//
// const planRoutes = express.Router();
//
// planRoutes.get('/:id', (req,res,next)=>{
//     const planId = req.params.id;
//
//     Plan.findById(planId, (err, result)=>{
//       if(err){
//         next(err);
//         return;
//       }
//       res.render('auth/plan-details', {plan: result});
//     });
//   });
//
// module.exports = planRoutes;
