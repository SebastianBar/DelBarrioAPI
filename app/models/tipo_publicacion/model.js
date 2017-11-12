import { bookshelf } from '../../connection'
import validate from './validations'

/* Se define el modelo */
const Model = bookshelf.Model.extend({
  tableName: 'REQ_TIPOS_PUBLICACION',
  idAttribute: 'IDEN_TIPO_PUBLICACION',
  publicaciones: function () {
    return this.hasMany(require('../publicacion/model').Model, 'IDEN_TIPO_PUBLICACION')
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
