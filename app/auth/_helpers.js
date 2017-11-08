import bcrypt from 'bcryptjs'

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

/* Se exportan los métodos */
module.exports = {
  comparePass,
  genHash
}
