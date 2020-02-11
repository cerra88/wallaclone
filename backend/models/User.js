'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// definimos un esquema
const userSchema = mongoose.Schema({
  username: { type: String, required: true, index: true, unique: true },
  email: { type: String, required: true, index: true, unique: true },
  pass: { type: String, required: true}
});

userSchema.statics.hashPassword = function(plainPassword) {
  return bcrypt.hash(plainPassword, 10);
}


const User = mongoose.model('User', userSchema);

module.exports = User;
