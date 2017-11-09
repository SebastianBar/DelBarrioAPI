import bookshelf from '../../connection'

/* Se define el modelo */
const Model = bookshelf.Model.extend({
  tableName: 'SIS_PERMISOS',
  idAttribute: 'IDEN_PERMISO',
  roles: function () {
    return this.belongsToMany(require('../rol/model').Model, 'SIS_PERMISOS_ROLES', 'IDEN_PERMISO', 'IDEN_ROL')
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
