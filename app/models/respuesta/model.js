import { bookshelf } from '../../connection.js';
import validate from './validations.js';
import { Model as ComentarioModel } from '../comentario/model.js';

/* Se define el modelo */
export const Model = bookshelf.Model.extend({
  tableName: 'REQ_RESPUESTAS',
  idAttribute: 'IDEN_RESPUESTA',
  comentario() {
    return this.belongsTo(ComentarioModel, 'IDEN_COMENTARIO');
  },
  initialize() {
    this.on('saving', validate, this);
  },
});

/* Se define colección a partir del modelo */
export const Collection = bookshelf.Collection.extend({
  model: Model,
});
