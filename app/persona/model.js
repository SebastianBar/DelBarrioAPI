'use strict'
var bookshelf = require('../connection').bookshelf

var Persona = bookshelf.Model.extend({
	tableName: 'EMPR_PERsonas',
	idAttribute: 'PER_Id'
})

var Personas = bookshelf.Collection.extend({
  model: Persona
})

/* Exports all methods */
module.exports = {
  Persona,
	Personas,
}
