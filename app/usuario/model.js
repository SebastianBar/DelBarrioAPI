'use strict'
var bookshelf = require('../connection').bookshelf

var Usuario = bookshelf.Model.extend({
	tableName: 'PER_USUARIOS',
	idAttribute: 'IDEN_USUARIO'
})

var Usuarios = bookshelf.Collection.extend({
  model: Usuario
})

/* Exports all methods */
module.exports = {
  Usuario,
	Usuarios,
}
