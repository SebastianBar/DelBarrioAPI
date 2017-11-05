'use strict'
var bookshelf = require('../../connection').bookshelf

var Categoria = bookshelf.Model.extend({
  tableName: 'REQ_CATEGORIAS',
  idAttribute: 'IDEN_CATEGORIA',
  categoria: function () {
    return this.belongsTo(require('../categoria/model').Categoria, 'IDEN_CATEGORIA_PADRE')
  }
})

var Categorias = bookshelf.Collection.extend({
  model: Categoria
})

/* Exports all methods */
module.exports = {
  Categoria,
  Categorias,
}
