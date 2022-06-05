import { bookshelf } from '../../connection.js';
import validate from './validations.js';
import { Model as RolModel } from '../rol/model.js';
import { Model as TelefonoModel } from '../telefono/model.js';
import { Model as PersonaModel } from '../persona/model.js';
import { Model as EmprendedorModel } from '../emprendedor/model.js';
// import { genHash } from '../../auth/_helpers' -- ToDo

/* Se define el modelo */
export const Model = bookshelf.Model.extend({
  tableName: 'USR_USUARIOS',
  idAttribute: 'IDEN_USUARIO',
  rol() {
    return this.belongsTo(RolModel, 'IDEN_ROL');
  },
  telefonos() {
    return this.hasMany(TelefonoModel, 'IDEN_USUARIO');
  },
  persona() {
    return this.hasOne(PersonaModel, 'IDEN_USUARIO');
  },
  emprendedor() {
    return this.hasOne(EmprendedorModel, 'IDEN_USUARIO');
  },
  initialize() {
    this.on('saving', validate, this);
  },
});

/* Se define colección a partir del modelo */
export const Collection = bookshelf.Collection.extend({
  model: Model,
});
