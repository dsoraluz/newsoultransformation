const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: {type: String, required: true},
  encryptedPassword: {type: String, required: true},
  dateOfBirth: String,
  phone: Number,
  address: {
    street: String,
    city: String,
    state: String,
    zip: Number
  },
  taxIdSSN: Number,
  language: String,
  referredBy: String,
  role: {
    type: String,
    enum: ['GUEST', 'MEMBER', 'ADMIN'],
    default: 'GUEST'
  },
  descendedFrom: {type: Schema.Types.ObjectId, ref: 'User'},
  descendants: {type: [Schema.Types.Mixed]},
  points: Number
},{
  timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;
