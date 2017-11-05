'use strict'
var bookshelf = require('../../connection').bookshelf

var Emprendedor = bookshelf.Model.extend({
  tableName: 'PER_EMPRENDEDORES',
  idAttribute: 'IDEN_EMPRENDEDOR',
  rubros: function () {
    return this.belongsToMany(require('../rubro/model').Rubro, 'PER_RUBROS_EMPRENDEDORES', 'IDEN_EMPRENDEDOR', 'IDEN_RUBRO')
  }
})

var Emprendedores = bookshelf.Collection.extend({
  model: Emprendedor
})

/* Exports all methods */
module.exports = {
  Emprendedor,
  Emprendedores,
}
