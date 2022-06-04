import Checkit from 'checkit';
import { knex } from '../../connection.js';

// Nombres de atributos en formato legible
const labels = {
  IDEN_PUBLICACION: 'ID de publicación',
  IDEN_EMPRENDEDOR: 'ID de emprendedor',
};

// Valores nativos de validaciones checkit en https://github.com/tgriesser/checkit
const validations = {
  IDEN_PUBLICACION: [{
    rule: 'number',
    message: `${labels.IDEN_PUBLICACION} debe ser de tipo "integer"`,
  }, {
    rule: 'natural',
    message: `${labels.IDEN_PUBLICACION} debe ser de tipo "integer"`,
  }, {
    rule: async (val) => {
      const resp = await knex('REQ_PUBLICACIONES').where('IDEN_PUBLICACION', '=', val);
      if (!resp.length) throw new Error(`${labels.IDEN_PUBLICACION} no existe`);
    },
  }],
  IDEN_EMPRENDEDOR: [{
    rule: 'number',
    message: `${labels.IDEN_EMPRENDEDOR} debe ser de tipo "integer"`,
  }, {
    rule: 'natural',
    message: `${labels.IDEN_EMPRENDEDOR} debe ser de tipo "integer"`,
  }, {
    rule: async (val) => {
      const resp = await knex('PER_EMPRENDEDORES').where('IDEN_EMPRENDEDOR', '=', val);
      if (!resp.length) throw new Error(`${labels.IDEN_EMPRENDEDOR} no existe`);
    },
  }],
};

/**
 * Ejecuta validaciones de un modelo, retornando Promise
 * @param {bookshelf.Model} model Modelo a validar
 */
const validate = (model) => Checkit(validations, { language: 'es' }).run(model.toJSON());

// Se exporta función
export default validate;
