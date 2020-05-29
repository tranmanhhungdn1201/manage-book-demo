const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
const multer = require('multer');
const upload = multer({dest:'./public/uploads/'});

router.get('/', controller.profile);

router.post('/', upload.single('avatar'), controller.updateAvatar);

module.exports = router;