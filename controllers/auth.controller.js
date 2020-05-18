const db = require('../db');

module.exports.profile = (req,res) => {
  res.render('profile/index');
};

module.exports.updateAvatar = (req,res) => {
  console.log(req.body);
  return;
  res.render('profile/index');
};