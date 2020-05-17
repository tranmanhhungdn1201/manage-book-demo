const db = require('../db');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.index = (req,res) => {
  res.render('users/index', {
    users : db.get('users').value()
  });
};

module.exports.create = (req,res) => {
  res.render('users/create');
};

module.exports.postCreate = (req,res) => {
  var defaultPassword = "123123"; //123123
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(defaultPassword, salt, function(err, hash) {
        var id = shortid.generate();
        db.get('users').push({
          id: id,
          email: req.body.email,
          name: req.body.name,
          age: req.body.age,
          password: hash
          }).write();
        });
  });
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