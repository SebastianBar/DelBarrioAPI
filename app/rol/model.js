'use strict'
var bookshelf = require('../connection').bookshelf

var Rol = bookshelf.Model.extend({
	tableName: 'SIS_ROLES',
	idAttribute: 'IDEN_ROL'
})

var Roles = bookshelf.Collection.extend({
  model: Rol
})

/* Exports all methods */
module.exports = {
  Rol,
	Roles,
}
