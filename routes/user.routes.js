const { Router } = require('express');
const { check } = require('express-validator');
const { getUser, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { validateFields, validateJwt, adminRole, allowedRoles } = require('../middlewares')
const { roleValidator, emailExistsValidator, userByIdExists } = require('../helpers/dbValidators');

const router = Router();

// Routes
router.get('/', getUser);

router.post('/', [

  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'La contraseña debe tener mas de 6 caracteres').isLength({ min: 6 }),
  check('email', 'El email no es valido').isEmail(),
  check('email').custom( emailExistsValidator ),
  check('role').custom( roleValidator ),
  validateFields

], createUser);

router.put('/:id', [

  check('id', 'No es un id valido').isMongoId(),
  check('id').custom( userByIdExists ),
  check('role').custom( roleValidator ),
  validateFields

], updateUser);

router.delete('/:id', [

  validateJwt,
  // adminRole,
  allowedRoles('ADMIN_ROLE', 'SALES_ROLE'),
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom( userByIdExists ),
  validateFields

], deleteUser);

module.exports = router;