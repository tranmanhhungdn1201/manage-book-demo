const db = require('../db');

module.exports.requiredAuth = (req, res, next) => {
  if(!req.signedCookies.userId){
    res.redirect('/login');
    return;
  }
  
  var user = db.get('users').find({id: req.signedCookies.userId}).value();
  if(!user){
    res.redirect('/login')
    return;
  }
  res.locals.userLogin = user;
  res.clearCookie('wrongLoginCount');
  next();
};