import { bookshelf } from '../../connection.js';
import validate from './validations.js';
import { Model as PublicacionModel } from '../publicacion/model.js';
import { Model as EmprendedorModel } from '../emprendedor/model.js';

/* Se define el modelo */
export const Model = bookshelf.Model.extend({
  tableName: 'REQ_IMAGENES',
  idAttribute: 'IDEN_IMAGEN',
  publicacion() {
    return this.belongsTo(PublicacionModel, 'IDEN_PUBLICACION');
  },
  emprendedor() {
    return this.belongsTo(EmprendedorModel, 'IDEN_EMPRENDEDOR');
  },
  initialize() {
    this.on('saving', validate, this);
  },
});

/* Se define colección a partir del modelo */
export const Collection = bookshelf.Collection.extend({
  model: Model,
});
