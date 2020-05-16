const db = require('../db');
const shortid = require('shortid');

module.exports.index = (req,res) => {
  var transactions = db.get('transactions').value();
  var dataTransactions = [];
  for(let transaction of transactions){
    let username = db.get('users').find({id:transaction.userId}).value().name;
    let book = db.get('books').find({id:transaction.bookId}).value().title;
    dataTransactions.push({
      username:username,
      book:book
    });
  }
  res.render('transactions/index', {
    transactions : dataTransactions
  });
};

module.exports.create = (req,res) => {
  res.render('transactions/create', {
    users : db.get('users').value(),
    books : db.get('books').value()
  });
};

module.exports.postCreate = (req,res) => {
  var id = shortid.generate();
  db.get('transactions').push({
    id: id,
    userId: req.body.userId,
    bookId: req.body.bookId
  }).write();
  res.redirect('/transactions');
};

