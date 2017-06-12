const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const User = require("../models/user-model.js");

const password = process.env.ADMIN_PASSWORD;

//Encypt password
const salt = bcrypt.genSaltSync(10);
const hashPass = bcrypt.hashSync(password, salt);

const user = {
  firstName: "Roberto",
  lastName: "Figueredo",
  username: "admin@newsoul.com",
  encryptedPassword: hashPass,
  phone: 3055955959,
  address: {
    street: "1596 W Flagler St.",
    city: "Miami",
    state: "Florida",
    zip: "33136"
  },
  language: "English",
  referredBy: "",
  role: "ADMIN",
  descendedFrom: null,
  descendants:[],
  points: 0
};

User.create(user, (err, docs)=>{
  if (err){
    throw(err);
  }
  docs.forEach((doc)=>{
    console.log(`${docs._id} ${docs.firstName} ${docs.lastName}`);
  });

  mongoose.disconnect();

});
