'use strict'
var bookshelf = require('../connection').bookshelf

var Rubro = bookshelf.Model.extend({
	tableName: 'PER_RUBROS',
	idAttribute: 'IDEN_RUBRO'
})

var Rubros = bookshelf.Collection.extend({
  model: Rubro
})

/* Exports all methods */
module.exports = {
  Rubro,
	Rubros,
}
