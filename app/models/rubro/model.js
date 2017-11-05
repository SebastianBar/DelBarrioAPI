'use strict'
var bookshelf = require('../../connection').bookshelf

var Rubro = bookshelf.Model.extend({
  tableName: 'PER_RUBROS',
  idAttribute: 'IDEN_RUBRO',
  emprendedores: function () {
    return this.belongsToMany(require('../emprendedor/model').Emprendedor, 'PER_RUBROS_EMPRENDEDORES', 'IDEN_RUBRO', 'IDEN_EMPRENDEDOR')
  }
})

var Rubros = bookshelf.Collection.extend({
  model: Rubro
})

/* Exports all methods */
module.exports = {
  Rubro,
  Rubros,
}
