'use strict'
var bookshelf = require('../connection').bookshelf

var Permiso = bookshelf.Model.extend({
	tableName: 'SIS_PERMISOS',
	idAttribute: 'IDEN_PERMISO'
})

var Permisos = bookshelf.Collection.extend({
  model: Permiso
})

/* Exports all methods */
module.exports = {
  Permiso,
	Permisos,
}
