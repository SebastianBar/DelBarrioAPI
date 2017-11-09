import { bookshelf } from '../../connection'

/* Se define el modelo */
const Model = bookshelf.Model.extend({
  tableName: 'USR_USUARIOS',
  idAttribute: 'IDEN_USUARIO',
  hidden: ['DESC_PASSWORD'],
  rol: function () {
    return this.belongsTo(require('../rol/model').Model, 'IDEN_ROL')
  },
  telefonos: function () {
    return this.hasMany(require('../telefono/model').Model, 'IDEN_USUARIO')
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
