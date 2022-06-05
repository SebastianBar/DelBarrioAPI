import { bookshelf } from '../../connection.js';
import validate from './validations.js';
import { Model as PermisoModel } from '../permiso/model.js';

/* Se define el modelo */
export const Model = bookshelf.Model.extend({
  tableName: 'SIS_ROLES',
  idAttribute: 'IDEN_ROL',
  permisos() {
    return this.belongsToMany(PermisoModel, 'SIS_PERMISOS_ROLES', 'IDEN_ROL', 'IDEN_PERMISO');
  },
  initialize() {
    this.on('saving', validate, this);
  },
});

/* Se define colección a partir del modelo */
export const Collection = bookshelf.Collection.extend({
  model: Model,
});
