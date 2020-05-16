const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const app = express();
const db = require('../db');

router.get('/', (req,res) => {
  res.render('transactions/index', {
    users : db.get('transactions').value()
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
  console.log(req.body);
  db.get('transactions').push({
    id: id,
    username: req.body.username,
    book: req.body.book
  }).write();
  res.redirect('/transactions');
});

module.exports = router;