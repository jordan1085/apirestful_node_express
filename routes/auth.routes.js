const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const { validateFields } = require('../middlewares');

router.post('/login', [

  check('email', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatorio').not().isEmpty(),
  validateFields

], authController.login);

router.post('/google', [

  check('id_token', 'El id token es requerido'),
  validateFields

], authController.googleSignIn);

module.exports = router;