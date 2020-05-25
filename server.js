const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const userRoute = require('./routes/user.route');
const bookRoute = require('./routes/book.route');
const loginRoute = require('./routes/login.route');
const profileRoute = require('./routes/profile.route');
const cartRoute = require('./routes/cart.route');
const transactionRoute = require('./routes/transaction.route');
const authMiddleware = require('./middleware/auth.middleware');
const sessionMiddleware = require('./middleware/session.middleware');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_CLUSTER_URI);

var cookieParser = require('cookie-parser');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
app.use(cookieParser('1dsadasdbfdw'));
app.use(express.static('public'));
var assets = require('./assets');
app.use("/assets", assets);

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-ur
var count = 1;
app.use(function (req, res, next) {
  console.log('cookie: ' + count++);
  next();
})
app.use(sessionMiddleware);
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
	res.send('Hello World!');
});
app.get('/send-mail', (req, res) =>{
  const msg = {
    to: 'tranmanh.hungdn1201@gmail.com',
    from: 'anhboy2002@gmail.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  sgMail.send(msg).then(() => {
      console.log('Message sent')
  }).catch((error) => {
      console.log(error.response.body)
      // console.log(error.response.body.errors[0].message)
  })
})
app.use('/login', loginRoute);
app.use('/transactions', authMiddleware.requiredAuth, transactionRoute);
app.use('/books', bookRoute);
app.use('/users', authMiddleware.requiredAuth, userRoute);
app.use('/profile', authMiddleware.requiredAuth, profileRoute);
app.use('/cart', cartRoute);
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));