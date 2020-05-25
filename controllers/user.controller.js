const db = require('../db');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/user.model');

module.exports.index = async (req, res) => {
  var users = await User.find();
  var page = parseInt(req.query.page) || 1;
  var perPage = 2;
  var start = perPage*(page-1);
  var end = page*perPage;
  res.render('users/index', {
    users : users.slice(start, end),
    page: {
      pageLength : users.length/2
    }
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
        const user = new User({
          id: id,
          email: req.body.email,
          name: req.body.name,
          age: req.body.age,
          avatar: req.body.avatar,
          password: hash
          });
        user.save(function (err) {
          console.log(err);
          if (!err) console.log('Success!');
        });
        });
  });
  res.redirect('/users');
};

module.exports.show = async (req,res) => {
  var id = req.params.id;
  var user = await User.findById(id);
  res.render('users/show',{
    user: user
  });
};
module.exports.edit = async (req,res) => {
  var id = req.params.id;
  var user = await User.findById(id);
  res.render('users/edit',{
    user: user
  });
};
module.exports.update = async (req,res) => {
  var id = req.params.id;
  var user = await User.findById(id);
  user.name = req.body.name;
  user.age = req.body.age;
  user.save();
  res.redirect('/users');
};

module.exports.delete = async (req,res) => {
  var id = req.params.id;
  var user = await User.findById(id);
  user.remove();
  res.redirect('back');
};
