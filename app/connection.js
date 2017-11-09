import cn from '../config'
import validator from './validator/custom'

// Se inicializa el Query Builder
const knex = require('knex')(cn.knexConfig)

// Se inicializa el ORM
var bookshelf = require('bookshelf')(knex)

// Se monta la extensión de validaciones
bookshelf.plugin('bookshelf-validate', {
  validator: validator,
  validateOnSave: true
})

// Se exporta el ORM
module.exports.bookshelf = bookshelf
