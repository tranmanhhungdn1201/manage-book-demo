const db = require('../db');

module.exports.requiredAuth = (req, res, next) => {
  console.log(req.cookies.userId);
  if(!req.cookies.userId){
    res.redirect('/login/index');
    return;
  }
  
  var user = db.get('users').find({id: req.cookie.suserId}).value();
  if(!user){
    res.redirect('/login/index')
    return;
  }
  next();
};