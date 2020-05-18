const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const validate = require('../validate/user.validate.js');
const multer = require('multer');
const upload = multer({dest:'./public/uploads/'});

router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create', validate.postCreate, controller.postCreate);

router.get('/:id', controller.show);

router.get('/:id/edit', controller.edit);

router.post('/update/:id', controller.update);

router.get('/:id/delete', controller.delete);

module.exports = router;