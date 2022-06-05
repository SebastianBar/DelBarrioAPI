import { bookshelf } from '../../connection.js';
import validate from './validations.js';
import { Model as PublicacionModel } from '../publicacion/model.js';

/* Se define el modelo */
export const Model = bookshelf.Model.extend({
  tableName: 'REQ_ETIQUETAS',
  idAttribute: 'IDEN_ETIQUETA',
  publicaciones() {
    return this.belongsToMany(PublicacionModel, 'REQ_PUBLICACIONES_ETIQUETAS', 'IDEN_ETIQUETA', 'IDEN_PUBLICACION');
  },
  initialize() {
    this.on('saving', validate, this);
  },
});

/* Se define colección a partir del modelo */
export const Collection = bookshelf.Collection.extend({
  model: Model,
});
