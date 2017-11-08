import { bookshelf } from '../../connection'

/* Se define el modelo */
const Model = bookshelf.Model.extend({
  tableName: 'PER_EMPRENDEDORES',
  idAttribute: 'IDEN_EMPRENDEDOR',
  rubros: function () {
    return this.belongsToMany(require('../rubro/model').Model, 'PER_RUBROS_EMPRENDEDORES', 'IDEN_EMPRENDEDOR', 'IDEN_RUBRO')
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
