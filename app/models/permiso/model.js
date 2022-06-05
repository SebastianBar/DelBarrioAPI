import { bookshelf } from '../../connection.js';
import validate from './validations.js';
import { Model as RolModel } from '../rol/model.js';

/* Se define el modelo */
export const Model = bookshelf.Model.extend({
  tableName: 'SIS_PERMISOS',
  idAttribute: 'IDEN_PERMISO',
  roles() {
    return this.belongsToMany(RolModel, 'SIS_PERMISOS_ROLES', 'IDEN_PERMISO', 'IDEN_ROL');
  },
  initialize() {
    this.on('saving', validate, this);
  },
});

/* Se define colección a partir del modelo */
export const Collection = bookshelf.Collection.extend({
  model: Model,
});
