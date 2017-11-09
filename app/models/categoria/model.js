import bookshelf from '../../connection'

/* Se define el modelo */
const Model = bookshelf.Model.extend({
  tableName: 'REQ_CATEGORIAS',
  idAttribute: 'IDEN_CATEGORIA',
  validations: {
    NOMB_CATEGORIA: [
      { method: 'isRequired', error: 'Nombre es obligatorio.' },
      { method: 'isLength', error: 'Nombre debe poseer entre 5 y 20 caracteres.', args: {min: 5, max: 20} }
    ],
    FLAG_VIGENTE: [
      { method: 'isBoolean', error: 'Vigente debe ser boolean.' }
    ]
  },
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
