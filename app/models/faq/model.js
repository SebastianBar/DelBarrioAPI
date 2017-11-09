import bookshelf from '../../connection'

/* Se define el modelo */
const Model = bookshelf.Model.extend({
  tableName: 'REQ_FAQ',
  idAttribute: 'IDEN_FAQ'
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
