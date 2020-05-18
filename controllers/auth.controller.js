const db = require('../db');
const multer = require('multer');
const cloudinary = require('cloudinary').v2

module.exports.profile = (req,res) => {
  res.render('profile/index');
};

module.exports.updateAvatar = (req,res) => {
  const path = req.file.path;
  var user = db.get('users').find({id: req.signedCookies.userId});
  const uniqueFilename = new Date().toISOString();
    cloudinary.uploader.upload(
      path,
      { public_id: 'profile/'+user.value().id, tags: `users` },
      function(err, image) {
        if (err) return res.send(err)
        console.log('file uploaded to Cloudinary');
        console.log(image);
        user.assign({
          avatar: image.url
        }).write();
      }
    )
    res.render('profile/index');
};