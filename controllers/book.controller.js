const db = require('../db');
const shortid = require('shortid');
const cloudinary = require('cloudinary')
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});
const Book = require('../models/book.model');
const User = require('../models/user.model');

module.exports.index = async (req, res) => {
  var userId = req.signedCookies.userId;
  var userLogin = await User.find({id:userId});
	res.render('books/index', {
		books: await Book.find(),
    userLogin: userLogin
	});
};

module.exports.create = (req, res) => {
	res.render('books/create');
};

module.exports.postCreate = (req, res) => {
  const path = req.file.path;
  const uniqueFilename = new Date().toISOString();
    cloudinary.uploader.upload(
      path,
      { public_id: 'books/'+ uniqueFilename, tags: `books` },
      function(err, image) {
        if (err) return res.send(err)
        console.log(image);
        console.log('file uploaded to Cloudinary');
        var id = shortid.generate();
        const book = new Book(
          {
            id: id,
            title: req.body.title,
            description: req.body.description,
            photo: image.url
          }
        );
        book.save(function (err) {
          console.log(err);
          if (!err) console.log('Success!');
        });
      }
    );
  res.redirect('/books');
};

module.exports.edit = (req, res) => {
  var id = req.params.id;
	res.render('books/edit', {
    book: db.get('books').find({ id:id }).value()
  });
};

module.exports.update = (req, res) => {
  var id = req.params.id;
  db.get('books').find({ id:id }).assign({
    title: req.body.title,
    description: req.body.description
  }).write();
	res.redirect('/books');
};

module.exports.delete = (req, res) => {
  var id = req.params.id;
  db.get('books').remove({ id: id }).write();
  res.redirect('back');
};
  