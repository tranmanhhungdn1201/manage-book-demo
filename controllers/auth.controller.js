const db = require('../db');

module.exports.profile = (req,res) => {
  res.render('profile/index');
};

module.exports.updateAvatar = (req,res) => {
  res.render('profile/index');
};