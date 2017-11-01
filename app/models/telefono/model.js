'use strict'
var bookshelf = require('../../connection').bookshelf

var Telefono = bookshelf.Model.extend({
	tableName: 'PER_TELEFONOS',
	idAttribute: 'IDEN_FONO',
	usuario: function() {
		return this.belongsTo(require('../usuario/model').Usuario, 'IDEN_USUARIO')
	}
})

var Telefonos = bookshelf.Collection.extend({
  model: Telefono
})

/* Exports all methods */
module.exports = {
  Telefono,
	Telefonos,
}
