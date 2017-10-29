'use strict'
var bookshelf = require('../connection').bookshelf

var Emprendedor = bookshelf.Model.extend({
	tableName: 'PER_EMPRENDEDORES',
	idAttribute: 'IDEN_EMPRENDEDOR'
})

var Emprendedores = bookshelf.Collection.extend({
  model: Emprendedor
})

/* Exports all methods */
module.exports = {
  Emprendedor,
	Emprendedores,
}