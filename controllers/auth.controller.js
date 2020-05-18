const db = require('../db');
const multer = require('multer');
var upload = multer({ dest: 'public/uploads/' })
const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: 'dkyjdrbdj',
  api_key: '344935473639373',
  api_secret: 'yYFVsoFhKL6hC1LRdNnpLVD6a6M'
})
module.exports.profile = (req,res) => {
  res.render('profile/index');
};

module.exports.updateAvatar = (req,res) => {
  upload(req, res, function (err) {
    if (err) {
      // This is a good practice when you want to handle your errors differently

      return
    }
  console.log(req.body);
    console.log(req.file)
    // Everything went fine 
  })
};