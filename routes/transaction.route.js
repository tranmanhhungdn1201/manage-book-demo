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
  res.render('transactions/create');
});

router.post('/create', (req,res) => {
  var id = shortid.generate();
  db.get('transactions').push({
    id: id,
    name: req.body.name,
    age: req.body.age
  }).write();
  res.redirect('/transactions');
});

module.exports = router;