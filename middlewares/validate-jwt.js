const jwt = require('jsonwebtoken');
const { User } = require('../models');

const validateJwt = async(req, res, next) => {

  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: 'No existe un token'
    })
  }

  try {
    // Verificar que el token sea valido y extraer el uid
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);

    // Leer el usuario que corresponde al uid
    const user = await User.findById(uid);

    // Verificar si el usuario existe en la bd
    if(!user){
      return res.status(401).json({
        msg: 'Token no valido - usuario no existe'
      })
    }

    // Verificar el estatus del usuario
    if(user.status === false){
      return res.status(401).json({
        msg: 'Token no valido - usuario eliminado'
      })
    }

    req.user = user;
    next();

  } catch (error) {

    console.log(error);
    res.status(401).json({
      msg: 'Token no valido'
    })

  }
};

module.exports = {
  validateJwt
}