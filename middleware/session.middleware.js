const db = require('../db');
const shortid = require('shortid');
module.exports = (req, res, next) => {
  var sessionId = shortid.generate();
  if(!req.signedCookies.sessionId){
    res.cookie('sessionId', sessionId, {
      signed : true
    });
  }
  next();
};