const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: {type: String, required: true},
  encryptedPassword: {type: String, required: true},
  role: {
    type: String,
    enum: ['GUEST', 'EDITOR', 'ADMIN'],
    default: 'GUEST'
  }
},{
  timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;
