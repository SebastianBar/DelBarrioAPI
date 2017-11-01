'use strict'
var bookshelf = require('../../connection').bookshelf

var Permiso = bookshelf.Model.extend({
	tableName: 'SIS_PERMISOS',
	idAttribute: 'IDEN_PERMISO',
	roles: function() {
    return this.belongsToMany(require('../rol/model').Rol, 'SIS_PERMISOS_ROLES', 'IDEN_PERMISO', 'IDEN_ROL')
  }
})

var Permisos = bookshelf.Collection.extend({
  model: Permiso
})

/* Exports all methods */
module.exports = {
  Permiso,
	Permisos,
}
