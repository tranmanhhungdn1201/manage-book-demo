const db = require('../db');
const shortid = require('shortid');

module.exports.index = (req, res) => {
  res.cookie("user-id", 12345);
	res.render('books/index', {
		books: db.get('books').value()
	});
};

module.exports.create = (req, res) => {
	res.render('books/create');
};

module.exports.postCreate = (req, res) => {
  console.log(req.body);
  db.get('books').push({
    id: shortid.generate(),
    title: req.body.title,
    description: req.body.description
  }).write();
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
  