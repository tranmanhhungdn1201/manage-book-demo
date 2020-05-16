const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const validate = require('../validate/user.validate.js');

router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create', validate.postCreate, controller.postCreate);

router.get('/:id', controller.show);

router.get('/:id/edit', controller.edit);

router.post('/update/:id', controller.update);

router.get('/:id/delete', );

module.exports = router;