import { bookshelf } from '../../connection.js';
import validate from './validations.js';
import { Model as EmprendedorModel } from '../emprendedor/model.js';
import { Model as CategoriaModel } from '../categoria/model.js';
import { Model as EtiquetaModel } from '../etiqueta/model.js';
import { Model as ImagenModel } from '../imagen/model.js';
import { Model as OfertaModel } from '../oferta/model.js';
import { Model as ComentarioModel } from '../comentario/model.js';
import { Model as CalificacionModel } from '../calificacion/model.js';

/* Se define el modelo */
export const Model = bookshelf.Model.extend({
  tableName: 'REQ_PUBLICACIONES',
  idAttribute: 'IDEN_PUBLICACION',
  emprendedor() {
    return this.belongsTo(EmprendedorModel, 'IDEN_EMPRENDEDOR');
  },
  categoria() {
    return this.belongsTo(CategoriaModel, 'IDEN_CATEGORIA');
  },
  etiquetas() {
    return this.belongsToMany(EtiquetaModel, 'REQ_PUBLICACIONES_ETIQUETAS', 'IDEN_PUBLICACION', 'IDEN_ETIQUETA');
  },
  imagenes() {
    return this.hasMany(ImagenModel, 'IDEN_PUBLICACION');
  },
  oferta() {
    return this.hasOne(OfertaModel, 'IDEN_PUBLICACION');
  },
  comentarios() {
    return this.hasMany(ComentarioModel, 'IDEN_PUBLICACION');
  },
  calificaciones() {
    return this.hasMany(CalificacionModel, 'IDEN_PUBLICACION');
  },
  initialize() {
    this.on('saving', validate, this);
  },
});

/* Se define colección a partir del modelo */
export const Collection = bookshelf.Collection.extend({
  model: Model,
});
