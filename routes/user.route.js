const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const app = express();
const db = require('../db');

router.get('/', (req,res) => {
  res.render('users/index', {
    users : db.get('users').value()
  });
});

router.get('/create', (req,res) => {
  res.render('users/create');
});

router.post('/create', (req,res) => {
  var id = shortid.generate();
  db.get('users').push({
    id: id,
    name: req.body.name,
    age: req.body.age
  }).write();
  res.redirect('back');
});

router.get('/:id', (req,res) => {
  var id = req.params.id;
  var user = db.get('users').find({id:id}).value();
  res.render('users/show',{
    user: user
  });
});

router.get('/:id/edit', (req,res) => {
  var id = req.params.id;
  var user = db.get('users').find({id:id}).value();
  res.render('users/edit',{
    user: user
  });
});

router.post('/update/:id', (req,res) => {
  var id = req.params.id;
  var user = db.get('users').find({id:id}).assign({
    name: req.body.name,
    age: req.body.age
  }).write();
  res.redirect('/users');
});

router.get('/:id/delete', (req,res) => {
  var id = req.params.id;
  var user = db.get('users').remove({id:id}).write();
  res.redirect('back');
});

module.exports = router;