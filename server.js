const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const userRoute = require('./routes/user.route');
const bookRoute = require('./routes/book.route');
const loginRoute = require('./routes/login.route');
const transactionRoute = require('./routes/transaction.route');
const authMiddleware = require('./middleware/auth.middleware');
var cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.static('public'));
var assets = require('./assets');
app.use("/assets", assets);

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-ur
var count = 1;
app.use(function (req, res, next) {
  console.log('cookie: ' + count++);
  next()
})
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.use('/login', loginRoute);
app.use('/transactions', transactionRoute);
app.use('/books', authMiddleware.requiredAuth, bookRoute);
app.use('/users', userRoute);
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));