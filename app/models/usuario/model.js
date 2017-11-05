'use strict'
var bookshelf = require('../../connection').bookshelf

var Usuario = bookshelf.Model.extend({
  tableName: 'USR_USUARIOS',
  idAttribute: 'IDEN_USUARIO',
  telefonos: function () {
    return this.hasMany(require('../telefono/model').Telefono, 'IDEN_USUARIO')
  }
})

var Usuarios = bookshelf.Collection.extend({
  model: Usuario
})

/* Exports all methods */
module.exports = {
  Usuario,
  Usuarios,
}
