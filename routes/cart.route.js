const express = require('express');
const router = express.Router();
const controller = require('../controllers/cart.controller');

router.get('/add-to-cart/:bookId', controller.addToCart);

router.get('/', controller.index);

module.exports = router;