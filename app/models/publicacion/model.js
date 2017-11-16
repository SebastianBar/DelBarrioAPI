import { bookshelf } from '../../connection'
import validate from './validations'

/* Se define el modelo */
const Model = bookshelf.Model.extend({
  tableName: 'REQ_PUBLICACIONES',
  idAttribute: 'IDEN_PUBLICACION',
  emprendedor: function () {
    return this.belongsTo(require('../emprendedor/model').Model, 'IDEN_EMPRENDEDOR')
  },
  categoria: function () {
    return this.belongsTo(require('../categoria/model').Model, 'IDEN_CATEGORIA')
  },
  imagenes: function () {
    return this.hasMany(require('../imagen/model').Model, 'IDEN_PUBLICACION')
  },
  ofertas: function () {
    return this.hasMany(require('../oferta/model').Model, 'IDEN_PUBLICACION')
  },
  comentarios: function () {
    return this.hasMany(require('../comentario/model').Model, 'IDEN_PUBLICACION')
  },
  calificaciones: function () {
    return this.hasMany(require('../calificacion/model').Model, 'IDEN_PUBLICACION')
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
