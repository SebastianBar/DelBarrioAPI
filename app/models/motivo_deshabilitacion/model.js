import { bookshelf } from '../../connection.js';
import validate from './validations.js';

/* Se define el modelo */
export const Model = bookshelf.Model.extend({
  tableName: 'REQ_MOTIVOS_DESHABILITACION',
  idAttribute: 'IDEN_MOTIVO_DESHABILITACION',
  initialize() {
    this.on('saving', validate, this);
  },
});

/* Se define colección a partir del modelo */
export const Collection = bookshelf.Collection.extend({
  model: Model,
});
