import { bookshelf } from '../../connection.js';
import validate from './validations.js';
import { Model as DenunciaModel } from '../denuncia/model.js';
import { Model as UsuarioModel } from '../usuario/model.js';

/* Se define el modelo */
export const Model = bookshelf.Model.extend({
  tableName: 'REQ_RESOLUCION_DENUNCIAS',
  idAttribute: 'IDEN_RESOLUCION_DENUNCIA',
  denuncia() {
    return this.belongsTo(DenunciaModel, 'IDEN_DENUNCIA');
  },
  usuario() {
    return this.belongsTo(UsuarioModel, 'IDEN_USUARIO');
  },
  initialize() {
    this.on('saving', validate, this);
  },
});

/* Se define colección a partir del modelo */
export const Collection = bookshelf.Collection.extend({
  model: Model,
});
