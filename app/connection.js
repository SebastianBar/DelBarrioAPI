'use strict'
import cn from '../config'

// Se inicializa el Query Builder
const knex = require('knex')(cn.knexConfig);

// Se inicializa el ORM
var bookshelf = require('bookshelf')(knex);

// Se exporta el ORM
module.exports.bookshelf = bookshelf;
