const jwt = require('jsonwebtoken');

exports.generateJWT = (uid = '') => {

  return new Promise((resolve, reject) => {
    
    const payload = { uid };

    jwt.sign(payload, process.env.SECRET_KEY, {

      expiresIn: 3600
  
    }, (err, token) => {

      if(err){
        console.log(err);
        reject('No se pudo generar el jwt')
      }else{
        resolve(token)
      }
      
    });

  });
};