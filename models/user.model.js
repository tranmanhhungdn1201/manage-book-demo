var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
  name: String,
  password: String,
  email: String,
  age: Number,
  avatar: String,
  isAdmin: Boolean
});

var User = mongoose.model('User', userSchema, 'manage_book.Users');

module.exports = User;