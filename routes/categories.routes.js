const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { validateFields, validateJwt, adminRole, allowedRoles } = require('../middlewares');
const { categoryByIdExists } = require('../helpers/dbValidators')
const { getCategories,
        getCategory,
        createCategory,
        updateCategory,
        deleteCategory } = require('../controllers/categoriesController');

// Obtener todas las cateforias
router.get('/', [

], getCategories);

// Obtener 1 categoria por id
router.get('/:id', [
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom( categoryByIdExists ),
  validateFields
], getCategory);

// Crear categoria
router.post('/', [
  validateJwt,
  allowedRoles('ADMIN_ROLE', 'SALES_ROLE', 'USER_ROLE'),
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  validateFields
], createCategory);

// Actualizar categoria
router.put('/:id', [
  validateJwt,
  allowedRoles('ADMIN_ROLE', 'SALES_ROLE', 'USER_ROLE'),
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom( categoryByIdExists ),
  validateFields
], updateCategory);

// Eliminar categoria
router.delete('/:id', [
  validateJwt,
  adminRole,
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom( categoryByIdExists ),
  validateFields
], deleteCategory);

module.exports = router;