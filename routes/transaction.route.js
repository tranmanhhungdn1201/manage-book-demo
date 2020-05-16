const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const app = express();
const db = require('../db');

router.get('/', (req,res) => {
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
  console.log(dataTransactions);
  res.render('transactions/index', {
    transactions : dataTransactions
  });
});

router.get('/create', (req,res) => {
  res.render('transactions/create', {
    users : db.get('users').value(),
    books : db.get('books').value()
  });
});

router.post('/create', (req,res) => {
  var id = shortid.generate();
  db.get('transactions').push({
    id: id,
    userId: req.body.userId,
    bookId: req.body.bookId
  }).write();
  res.redirect('/transactions');
});

module.exports = router;