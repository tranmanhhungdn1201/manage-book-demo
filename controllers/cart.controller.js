const db = require('../db');
const shortid = require('shortid');

module.exports.index = (req,res) => {
  var sessionId = req.signedCookies.sessionId;
  if(!sessionId){
     res.redirect('/books');
      return;
  }
  var carts = db.get('sessions')
    .find({id: sessionId})
    .value().cart;
  var books = [];
  var book = {};
  for(let bookId in carts){
    book['book'] = db.get('books').find({id:bookId}).value();
    book['amount'] = carts.bookId;
    books.push(book);
  }
  console.log(books);
    res.render('cart/index', {
      books :books
    });
};

module.exports.addToCart = (req,res) => {
  var bookId = req.params.bookId;
  var sessionId = req.signedCookies.sessionId;
  if(!sessionId){
     res.redirect('/books');
      return;
  }
  var count = db.get('sessions')
    .find({id: sessionId})
    .get('cart.'+ bookId, 0)
    .value();
  
  db.get('sessions')
    .find({id: sessionId})
    .set('cart.' + bookId, count + 1)
    .write();
  res.redirect('/books');
};

module.exports.borrowBook = (req,res) => {
  var sessionId = req.signedCookies.sessionId;
  var userId = req.signedCookies.userId;
  if(!sessionId){
     res.redirect('/books');
      return;
  }
  var carts = db.get('sessions')
    .find({id: sessionId})
    .value().cart;
  for(let bookId in carts){
    var id = shortid.generate();
    db.get('transactions').push({
      id: id,
      userId: userId,
      bookId: bookId
    }).write();
  }
  
  res.redirect('/books');
};

