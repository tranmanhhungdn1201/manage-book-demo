var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var bookSchema = new Schema({
  title: String,
  description: String,
  photo: String,
  age: Number,
  avatar: String,
  isAdmin: Boolean
});

var Book = mongoose.model('Book', bookSchema, 'Books');

module.exports = Book;