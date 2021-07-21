const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares');
const { upload, uploadUpdate } = require('../controllers/uploadsController');
const { validCollection } = require('../helpers');

const router = Router();

router.post('/', [

], upload);

router.put('/:collection/:id', [
  check('id', 'No es un id valido').isMongoId(),
  check('collection').custom( c => validCollection(c, ['users', 'products'])),
  validateFields
], uploadUpdate);

module.exports = router;