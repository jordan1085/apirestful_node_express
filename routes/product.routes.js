const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { validateFields, validateJwt, adminRole, allowedRoles } = require('../middlewares');
const { productByIdExists } = require('../helpers/dbValidators')
const { getProducts, 
        getProduct, 
        createProduct, 
        updateProduct, 
        deleteProduct } = require('../controllers/productController');

// Obtener todos los prodcutos
router.get('/', [

], getProducts);

// Obtener 1 categoria por id
router.get('/:id', [
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom( productByIdExists ),
  validateFields
], getProduct);

// Crear producto
router.post('/', [
  validateJwt,
  allowedRoles('ADMIN_ROLE', 'SALES_ROLE', 'USER_ROLE'),
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  validateFields
], createProduct);

// Actualizar categoria
router.put('/:id', [
  validateJwt,
  allowedRoles('ADMIN_ROLE', 'SALES_ROLE', 'USER_ROLE'),
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom( productByIdExists ),
  validateFields
], updateProduct);

// Eliminar categoria
router.delete('/:id', [
  validateJwt,
  adminRole,
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom( productByIdExists ),
  validateFields
], deleteProduct);

module.exports = router;