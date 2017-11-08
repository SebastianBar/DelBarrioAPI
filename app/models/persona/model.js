'use strict'
var bookshelf = require('../../connection').bookshelf

var Persona = bookshelf.Model.extend({
  tableName: 'PER_PERSONAS',
  idAttribute: 'IDEN_PERSONA',
  usuario: function () {
    return this.belongsTo(require('../usuario/model').Usuario, 'IDEN_USUARIO')
  }
})

var Personas = bookshelf.Collection.extend({
  model: Persona
})

/* Exports all methods */
module.exports = {
  Persona,
  Personas,
}
