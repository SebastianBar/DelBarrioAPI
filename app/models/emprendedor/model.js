import { bookshelf } from '../../connection.js';
import validate from './validations.js';
import { Model as UsuarioModel } from '../usuario/model.js';
import { Model as RubroModel } from '../rubro/model.js';
import { Model as ImagenModel } from '../imagen/model.js';
import { Model as PublicacionModel } from '../publicacion/model.js';

/* Se define el modelo */
export const Model = bookshelf.Model.extend({
  tableName: 'PER_EMPRENDEDORES',
  idAttribute: 'IDEN_EMPRENDEDOR',
  usuario() {
    return this.belongsTo(UsuarioModel, 'IDEN_USUARIO');
  },
  rubro() {
    return this.belongsTo(RubroModel, 'IDEN_RUBRO');
  },
  imagen() {
    return this.hasOne(ImagenModel, 'IDEN_EMPRENDEDOR');
  },
  publicaciones() {
    return this.hasMany(PublicacionModel, 'IDEN_EMPRENDEDOR');
  },
  initialize() {
    this.on('saving', validate, this);
  },
});

/* Se define colección a partir del modelo */
export const Collection = bookshelf.Collection.extend({
  model: Model,
});
