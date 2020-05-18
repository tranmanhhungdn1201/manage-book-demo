const db = require('../db');

module.exports.index = (req,res) => {
  var sessionId = req.signedCookies.sessionId;
  if(!sessionId){
     res.redirect('/books');
      return;
  }
  var carts = db.get('sessions')
    .find({id: sessionId})
    .value();

  console.log(db.get('sessions').value());
  return;
    res.render('cart/index');
};

module.exports.addToCart = (req,res) => {
  var bookId = req.params.bookId;
  var sessionId = req.signedCookies.sessionId;
  if(!sessionId){
     res.redirect('/books');
      return;
  }
  var count = db.get('sessions')
    .find({id: sessionId}).value();
  
  db.get('sessions')
    .find({id: sessionId})
    .set('cart.' + bookId, count + 1)
    .write();
  res.redirect('/books');
};