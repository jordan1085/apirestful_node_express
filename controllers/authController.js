const { User } = require('../models');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate_jwt');
const { googleVerify } = require('../helpers/google-verify');

exports.login = async(req, res) => {

  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email });
    
    // Verificar si el email existe
    if(!user){
      return res.status(400).json({
        msg: 'Usuario / contraseña no son conrrectos - correo'
      })
    }

    // Si el usuario esta activo
    if(user.status === false){
      return res.status(400).json({
        msg: 'Usuario / contraseña no son conrrectos - estado: false'
      })
    }

    // Verificar contraseña
    const validPassword = bcryptjs.compareSync( password, user.password );
    if(!validPassword){
      return res.status(400).json({
        msg: 'Usuario / contraseña no son conrrectos - password'
      })
    }

    // Generar JWT
    const token = await generateJWT( user.id );

    // Respuesta
    res.json({
      user,
      token
    })

  } catch (error) {
    console.log(error);
    return res.status(400).send('Hubo un error');
  }
}

exports.googleSignIn = async(req, res) => {

  const { id_token } = req.body;

  try {

    // Retorno del helper de validacion de token de google
    const { name, email, img } = await googleVerify(id_token);

    let user = await User.findOne({email});

    if(!user){
      // Crear user
      const data = {
        name,
        email,
        password: 'abc',
        img,
        google: true
      };

      user = new User( data );
      await user.save();
    }

    // Si el usuario en DB
    if(!user.status){
      return res.status(401).json({
        msg: 'Usuario bloqueado'
      })
    }

    // Generar JWT
    const token = await generateJWT( user.id );

    res.json({
      user,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: 'Token de google no es válido'
    })
  }
}