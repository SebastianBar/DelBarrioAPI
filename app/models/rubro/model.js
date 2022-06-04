import { bookshelf } from '../../connection.js';
import validate from './validations.js';
import { Model as EmprendedorModel } from '../emprendedor/model.js';

/* Se define el modelo */
export const Model = bookshelf.Model.extend({
  tableName: 'PER_RUBROS',
  idAttribute: 'IDEN_RUBRO',
  emprendedores() {
    return this.hasMany(EmprendedorModel, 'IDEN_RUBRO');
  },
  initialize() {
    this.on('saving', validate, this);
  },
});

/* Se define colección a partir del modelo */
export const Collection = bookshelf.Collection.extend({
  model: Model,
});
