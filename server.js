const express = require('express');
const shortid = require('shortid');
const app = express();
const port = 3000;
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const bodyParser = require('body-parser')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ books: []})
  .write()

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/books', (req, res) => {
	res.render('books/index', {
		books: db.get('books').value()
	});
});

app.get('/books/create', (req, res) => {
	res.render('books/create');
});

app.post('/books/create', (req, res) => {
  db.get('books').push({
    id: shortid.generate(),
    title: req.body.title,
    description: req.body.description
  }).write();
  res.redirect('/books');
});

app.get('/books/edit/:id', (req, res) => {
  var id = req.params.id;
	res.render('books/edit', {
    book: db.get('books').find({ id:id }).value()
  });
});

app.post('/books/update/:id', (req, res) => {
  var id = req.params.id;
  db.get('books').find({ id:id }).assign({
    title: req.body.title,
    description: req.body.description
  }).write();
	res.render('books/index', {
    books:db.get('books').value()
  });
});

app.get("/books/:id/delete", (req, res) => {
  var id = req.params.id;
  db.get('books').remove({ id: id }).write();
  res.redirect('back');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));