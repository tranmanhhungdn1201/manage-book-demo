const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('../db');

module.exports.index = (req,res) => {
  res.render('login/index');
};

module.exports.postLogin = (req, res, next) => {
  var errors = [];
  var wrongLoginCount = req.cookies.wrongLoginCount ? req.cookies.wrongLoginCount : 0;
  if(+wrongLoginCount === 4){
    errors.push('Login fail too many times!');
    res.render('login/index', {
      errors : errors,
      value: res.body
    });
    return;
  }
  var checkLogin = true;
  if(!req.body.email){
    errors.push('Email is required');
    checkLogin = false;
  }
  if(!req.body.password){
      errors.push('Password is required');
      checkLogin = false;
  }
  if(!checkLogin){
    res.render('login/index', {
      errors : errors,
      value: req.body
    });
    return;
  }
  var email = req.body.email;
  var password = req.body.password;
  var user = db.get('users').find({email: email}).value();
  if(!user){
    errors.push('User\'s not exist')
    res.render('login/index', {
      errors : errors,
      value: res.body
    });
    return;
  }
  bcrypt.compare(password, user.password, function(err, result) {
      if(!result){
        res.cookie('wrongLoginCount', ++wrongLoginCount);
        console.log(wrongLoginCount);
        errors.push('Wrong password')
        console.log(errors);
        res.render('login/index', {
          errors : errors,
          value: req.body
        });
        return true;
      }
    res.cookie('userId', user.id, {
      signed : true
    });
    res.redirect('/books');
  });

};
