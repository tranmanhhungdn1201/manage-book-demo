
const express = require('express');
const shortid = require('shortid');
const app = express();
const bodyParser = require('body-parser')
const db = require('./db');

app.get('/', (req,res) => {
  res.reder('users/index', {
    users : db.get('users').value();
  });
});