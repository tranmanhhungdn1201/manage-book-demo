const express = require('express');
const router = express.Router();
const controller = require('../controllers/book.controller');
const multer = require('multer');
const upload = multer({dest:'./public/uploads/'});

router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create', upload.single('image'), controller.postCreate);

router.get('/edit/:id', controller.edit);

router.post('/update/:id', controller.update);

router.get("/:id/delete", controller.delete);

module.exports = router;
