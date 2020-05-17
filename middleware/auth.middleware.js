const db = require('../db');

module.exports.requiredAuth = (req, res, next) => {
  console.log(req.cookies.userId);
  if(!req.cookies.userId){
    res.redirect('/login');
    return;
  }
  
  var user = db.get('users').find({id: req.cookies.userId}).value();
  if(!user){
    res.redirect('/login')
    return;
  }
  next();
};