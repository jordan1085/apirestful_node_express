const dbValidators = require('./dbValidators');
const generateJwt = require('./generate_jwt');
const googleVerify = require('./google-verify');
const uploadFile = require('./uploadFile');

module.exports = {
  ...dbValidators,
  ...generateJwt,
  ...googleVerify,
  ...uploadFile
}