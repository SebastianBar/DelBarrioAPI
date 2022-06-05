import { bookshelf } from '../../connection.js';
import validate from './validations.js';
import { Model as PublicacionModel } from '../publicacion/model.js';
import { Model as CalificacionModel } from '../calificacion/model.js';
import { Model as ComentarioModel } from '../comentario/model.js';
import { Model as UsuarioModel } from '../usuario/model.js';
import { Model as MotivoDenunciaModel } from '../motivo_denuncia/model.js';
import { Model as ResolucionDenunciaModel } from '../resolucion_denuncia/model.js';

/* Se define el modelo */
export const Model = bookshelf.Model.extend({
  tableName: 'REQ_DENUNCIAS',
  idAttribute: 'IDEN_DENUNCIA',
  publicacion() {
    return this.belongsTo(PublicacionModel, 'IDEN_PUBLICACION');
  },
  calificacion() {
    return this.belongsTo(CalificacionModel, 'IDEN_CALIFICACION');
  },
  comentario() {
    return this.belongsTo(ComentarioModel, 'IDEN_COMENTARIO');
  },
  usuario() {
    return this.belongsTo(UsuarioModel, 'IDEN_USUARIO');
  },
  motivo_denuncia() {
    return this.belongsTo(MotivoDenunciaModel, 'IDEN_MOTIVO_DENUNCIA');
  },
  resolucion_denuncia() {
    return this.hasOne(ResolucionDenunciaModel, 'IDEN_DENUNCIA');
  },
  initialize() {
    this.on('saving', validate, this);
  },
});

/* Se define colección a partir del modelo */
export const Collection = bookshelf.Collection.extend({
  model: Model,
});
