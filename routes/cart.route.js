const express = require('express');
const router = express.Router();
const controller = require('../controllers/cart.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/add-to-cart/:bookId', controller.addToCart);

router.get('/', controller.index);

router.get('/borrow', authMiddleware.requiredAuth, controller.borrowBook);
module.exports = router;