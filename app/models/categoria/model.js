const bookshelf = require('../../connection').bookshelf

/* Se define el modelo Categoria */
const Categoria = bookshelf.Model.extend({
  tableName: 'REQ_CATEGORIAS',
  idAttribute: 'IDEN_CATEGORIA',
  subcategorias: function () {
    return this.hasMany(require('../categoria/model').Categoria, 'IDEN_CATEGORIA_PADRE')
  }
})

/* Se define la colección Categorias a partir del modelo Categoria */
const Categorias = bookshelf.Collection.extend({
  model: Categoria
})

/* Se exportan las constantes */
module.exports = {
  Categoria,
  Categorias,
}
