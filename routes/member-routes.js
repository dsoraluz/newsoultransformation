const express = require('express');
const User = require('../models/user-model');
const ensure = require('connect-ensure-login');
const bcrypt = require('bcrypt');

const memberRoutes = express.Router();

memberRoutes.get('/signup/:id', (req, res, next)=>{



});



module.exports = memberRoutes;
