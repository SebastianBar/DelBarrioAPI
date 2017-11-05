'use strict'
var bookshelf = require('../../connection').bookshelf

var Rol = bookshelf.Model.extend({
  tableName: 'SIS_ROLES',
  idAttribute: 'IDEN_ROL',
  permisos: function () {
    return this.belongsToMany(require('../permiso/model').Permiso, 'SIS_PERMISOS_ROLES', 'IDEN_ROL', 'IDEN_PERMISO')
  }
})

var Roles = bookshelf.Collection.extend({
  model: Rol
})

/* Exports all methods */
module.exports = {
  Rol,
  Roles,
}
