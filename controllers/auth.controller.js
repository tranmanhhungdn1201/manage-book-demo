const db = require('../db');
const multer = require('multer');
var upload = multer();
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
  const path = req.file.path;
  var user = db.get('users').find({id: req.signedCookies.userId}).value();
  const uniqueFilename = new Date().toISOString();
    cloudinary.uploader.upload(
      path,
      { public_id: `profile/${uniqueFilename}`, tags: `users` },
      function(err, image) {
        if (err) return res.send(err)
        console.log('file uploaded to Cloudinary');
        user.
      }
    )

};