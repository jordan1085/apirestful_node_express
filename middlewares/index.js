const vFields = require('./validate-fields');
const vJwt = require('./validate-jwt');
const vRoles =  require('./validate-role');

module.exports = {
    ...vFields,
    ...vJwt,
    ...vRoles,
}