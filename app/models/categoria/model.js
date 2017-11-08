import { bookshelf } from '../../connection'

/* Se define el modelo */
const Model = bookshelf.Model.extend({
  tableName: 'REQ_CATEGORIAS',
  idAttribute: 'IDEN_CATEGORIA',
  subcategorias: function () {
    return this.hasMany(require('../categoria/model').Model, 'IDEN_CATEGORIA_PADRE')
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
