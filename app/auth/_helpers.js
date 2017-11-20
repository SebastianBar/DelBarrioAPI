const bcrypt = require('bcryptjs')
const omitDeep = require('omit-deep')

/**
 * Comparación de una contraseña respecto a su hash.
 * @param {string} userPassword - Contraseña como texto plano.
 * @param {string} databasePassword - Contraseña como hash bcrypt.
 * @return {boolean} Define si las contraseñas coinciden.
 */
function comparePass (userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword)
}

/**
 * Generar hash bcrypt en base a texto plano.
 * @param {string} password - Contraseña en texto plano.
 * @return {string} Contraseña como hash bcrypt.
 */
function genHash (password) {
  const salt = bcrypt.genSaltSync()
  return bcrypt.hashSync(password, salt)
}

/**
 * Funciones para filtrar datos de los retornos JSON
 */
var filter = {
  getUsuario: function (entity) {
    var omit = ['IDEN_USUARIO', 'IDEN_ROL', 'DESC_PASSWORD', 'FLAG_VIGENTE', 'FLAG_BAN', 'IDEN_PERSONA']
    omit.push(Object.keys(entity.relations.emprendedor.attributes).length === 0 ? 'emprendedor' : 'persona')
    return omitDeep(entity, omit)
  }
}

/* Se exportan los métodos */
module.exports = {
  comparePass,
  genHash,
  filter
}
