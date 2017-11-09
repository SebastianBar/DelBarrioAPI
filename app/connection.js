import cn from '../config'

// Se inicializa el Query Builder
const knex = require('knex')(cn.knexConfig)

// Se inicializa el ORM
var bookshelf = require('bookshelf')(knex)

// Se monta la extensión de visibilidad de atributos
bookshelf.plugin('visibility')

// Se exporta el ORM
export default bookshelf
