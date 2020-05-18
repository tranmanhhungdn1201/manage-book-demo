const db = require('../db');
const shortid = require('shortid');
const cloudinary = require('cloudinary').v2

module.exports.index = (req, res) => {
  var userId = req.signedCookies.userId;
  var userLogin = db.get('users').find({id:userId}).value();
	res.render('books/index', {
		books: db.get('books').value(),
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
        console.log('file uploaded to Cloudinary');
        console.log(image);
        db.get('books').push({
          id: shortid.generate(),
          title: req.body.title,
          description: req.body.description,
          image: image.url
        }).write();
      }
    )
 
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
  