const db = require('../db');

module.exports.index = (req,res) => {
  res.render('cart/index');
};

module.exports.addToCart = (req,res) => {
  var bookId = req.params.bookId;
  var sessionId = req.singedCookies.sessionId;
  
  if(!sessionId){
     res.redirect('/books');
      return;
  }
  db.get('sessions')
    .find({sessionId: sessionId})
    .set('cart.' + bookId, 1)
    .write();
  res.redirect('/books');
};