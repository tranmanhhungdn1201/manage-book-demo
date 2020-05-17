var db = require('../db');
module.exports.postCreate = (req, res, next) => {
  var errors = [];
  if(req.body.name.length > 30){
    errors.push('Name must be less than 30 characters')
    res.render('users/create', {
      errors : errors,
      value : req.body
    });
    return;
  }
  var userHasEmail = db.get('users').find({email:req.body.email}).value();
  if(userHasEmail){
    errors.push('Email is exits')
    res.render('users/create', {
      errors : errors,
      value : req.body
    });
    return;
  }
  next();
};