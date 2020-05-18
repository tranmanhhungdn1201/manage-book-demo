const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
const multer = require('multer');
const upload = multer();

router.get('/', controller.profile);

router.post('/', upload.none(), controller.updateAvatar);

module.exports = router;