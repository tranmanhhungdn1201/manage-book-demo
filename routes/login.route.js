const express = require('express');
const router = express.Router();
const controller = require('../controllers/login.controller');

router.get('/', controller.index);

router.post('/', controller.postLogin);

module.exports = router;