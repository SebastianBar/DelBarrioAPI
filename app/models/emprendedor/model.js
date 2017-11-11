import { bookshelf } from '../../connection'
import validate from './validations'

/* Se define el modelo */
const Model = bookshelf.Model.extend({
  tableName: 'PER_EMPRENDEDORES',
  idAttribute: 'IDEN_EMPRENDEDOR',
  usuario: function () {
    return this.belongsTo(require('../usuario/model').Model, 'IDEN_USUARIO')
  },
  rubros: function () {
    return this.belongsToMany(require('../rubro/model').Model, 'PER_RUBROS_EMPRENDEDORES', 'IDEN_EMPRENDEDOR', 'IDEN_RUBRO')
  },
  initialize: function () {
    this.on('saving', validate, this)
  }
})

/* Se define colección a partir del modelo */
const Collection = bookshelf.Collection.extend({
  model: Model
})

/* Se exportan las constantes */
module.exports = {
  Model,
  Collection,
}
