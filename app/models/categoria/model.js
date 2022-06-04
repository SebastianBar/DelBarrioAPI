import { bookshelf } from '../../connection.js';
import validate from './validations.js';
import { Model as PublicacionModel } from '../publicacion/model.js';

/* Se define el modelo */
export const Model = bookshelf.Model.extend({
  tableName: 'REQ_CATEGORIAS',
  idAttribute: 'IDEN_CATEGORIA',
  subcategorias() {
    return this.hasMany(Model, 'IDEN_CATEGORIA_PADRE');
  },
  publicaciones() {
    return this.hasMany(PublicacionModel, 'IDEN_PUBLICACION');
  },
  initialize() {
    this.on('saving', validate, this);
  },
});

/* Se define colección a partir del modelo */
export const Collection = bookshelf.Collection.extend({
  model: Model,
});
