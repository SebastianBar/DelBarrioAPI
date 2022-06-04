import { bookshelf } from '../../connection.js';
import validate from './validations.js';
import { Model as DenunciaModel } from '../denuncia/model.js';

/* Se define el modelo */
export const Model = bookshelf.Model.extend({
  tableName: 'REQ_MOTIVOS_DENUNCIA',
  idAttribute: 'IDEN_MOTIVO_DENUNCIA',
  denuncias() {
    return this.hasMany(DenunciaModel, 'IDEN_MOTIVO_DENUNCIA');
  },
  initialize() {
    this.on('saving', validate, this);
  },
});

/* Se define colección a partir del modelo */
export const Collection = bookshelf.Collection.extend({
  model: Model,
});
