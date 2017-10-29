'use strict'
var bookshelf = require('../connection').bookshelf

var Telefono = bookshelf.Model.extend({
	tableName: 'PER_FONOS',
	idAttribute: 'IDEN_FONO'
})

var Telefonos = bookshelf.Collection.extend({
  model: Telefono
})

/* Exports all methods */
module.exports = {
  Telefono,
	Telefonos,
}
