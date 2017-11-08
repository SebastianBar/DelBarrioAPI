import { bookshelf } from '../../connection'

/* Se define el modelo */
const Model = bookshelf.Model.extend({
  tableName: 'PER_TELEFONOS',
  idAttribute: 'IDEN_FONO',
  usuario: function () {
    return this.belongsTo(require('../usuario/model').Model, 'IDEN_USUARIO')
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
