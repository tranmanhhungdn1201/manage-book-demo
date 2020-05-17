const db = require('../db');
const shortid = require('shortid');

module.exports.index = (req,res) => {
  res.render('users/index', {
    users : db.get('users').value()
  });
};

module.exports.create = (req,res) => {
  res.render('users/create');
};

module.exports.postCreate = (req,res) => {
  var defaultPassword = "4297f44b13955235245b2497399d7a93"; //123123
  var id = shortid.generate();
  db.get('users').push({
    id: id,
    email: req.body.email,
    name: req.body.name,
    age: req.body.age,
    password: defaultPassword
  }).write();
  res.redirect('/users');
};

module.exports.show = (req,res) => {
  var id = req.params.id;
  var user = db.get('users').find({id:id}).value();
  res.render('users/show',{
    user: user
  });
};
module.exports.edit = (req,res) => {
  var id = req.params.id;
  var user = db.get('users').find({id:id}).value();
  res.render('users/edit',{
    user: user
  });
};
module.exports.update = (req,res) => {
  var id = req.params.id;
  var user = db.get('users').find({id:id}).assign({
    name: req.body.name,
    age: req.body.age
  }).write();
  res.redirect('/users');
};

module.exports.delete = (req,res) => {
  var id = req.params.id;
  var user = db.get('users').remove({id:id}).write();
  res.redirect('back');
};