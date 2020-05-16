const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const rou = express();
const db = require('../db');
const app = express();

router.get('/', (req, res) => {
	res.render('books/index', {
		books: db.get('books').value()
	});
});

router.get('/create', (req, res) => {
	res.render('books/create');
});

router.post('/create', (req, res) => {
  console.log(req.body);
  db.get('books').push({
    id: shortid.generate(),
    title: req.body.title,
    description: req.body.description
  }).write();
  res.redirect('/books');
});

router.get('/edit/:id', (req, res) => {
  var id = req.params.id;
	res.render('books/edit', {
    book: db.get('books').find({ id:id }).value()
  });
});

router.post('/books/update/:id', (req, res) => {
  var id = req.params.id;
  db.get('books').find({ id:id }).assign({
    title: req.body.title,
    description: req.body.description
  }).write();
	res.render('books/index', {
    books:db.get('books').value()
  });
});

router.get("/:id/delete", (req, res) => {
  var id = req.params.id;
  db.get('books').remove({ id: id }).write();
  res.redirect('back');
});

module.exports = router;
