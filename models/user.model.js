var mongoose = require('mongoose');

var Schema = mongoose.Schema
var userSchema = new Schema({
  name: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  age: Number,
  avatar: {type: String, required: true},
  isAdmin: Boolean
});

var User = mongoose.model('User', userSchema, 'Users');

module.exports = User;