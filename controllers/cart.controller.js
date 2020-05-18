const db = require('../db');

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