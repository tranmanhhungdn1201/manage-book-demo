const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const userRoute = require('./routes/user.route');
const bookRoute = require('./routes/book.route');
const transactionRoute = require('./routes/transaction.route');
app.use(express.static('public'));

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-ur

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.use('/transactions', transactionRoute);
app.use('/books', bookRoute);
app.use('/users', userRoute);
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));