
const express = require('express');
const shortid = require('shortid');
const app = express();
const bodyParser = require('body-parser')
const db = require('./db');

app.get('/', (req,res) => {
  res.reder('users/index', {
    users : db.get('users').value()
  });
});

app.get('/create', (req,res) => {
  res.render('users/create');
});

app.post('/create', (req,res) => {
  var id = shortid.generate();
  db.get('users').push({
    id: id,
    name: req.body.name,
    age: req.body.age
  }).write();
  res.render('users/create');
});

app.get('/:id', (req,res) => {
  var id = req.params.id;
  var user = db.get('users').find({id:id}).value();
  res.render('users/show',{
    user: user
  });
});

app.get('/:id/edit', (req,res) => {
  var id = req.params.id;
  var user = db.get('users').find({id:id}).value();
  res.render('users/edit',{
    user: user
  });
});

app.post('/update/:id', (req,res) => {
  var id = req.params.id;
  var user = db.get('users').find({id:id}).assign({
    name: req.body.name,
    age: req.body.age
  }).write();
  res.redirect('users'});
});