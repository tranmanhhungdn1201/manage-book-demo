const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');

router.get('/', controller.profile);

router.post('/', controller.updateAvatar);

module.exports = router;