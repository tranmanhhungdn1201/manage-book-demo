const db = require('../db');

module.exports.index = (req,res) => {
  res.render('login/index');
};

module.exports.postLogin = (req, res, next) => {
  var errors = [];
  if(!req.body.email){
    errors.push('Email is required');
  }
  if(!req.body.password){
    errors.push('Password is required');
  }
  
  
};
