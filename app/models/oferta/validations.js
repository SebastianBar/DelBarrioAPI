import Checkit from 'checkit';
import { knex } from '../../connection.js';

// Nombres de atributos en formato legible
const labels = {
  IDEN_PUBLICACION: 'ID de publicación',
  FECH_INICIO: 'Fecha de inicio',
  FECH_TERMINO: 'Fecha de término',
  NUMR_PRECIO: 'Precio de oferta',
};

// Valores nativos de validaciones Checkit en https://github.com/tgriesser/checkit
const validations = {
  IDEN_PUBLICACION: [{
    rule: 'required',
    label: labels.IDEN_PUBLICACION,
  }, {
    rule: 'number',
    message: `${labels.IDEN_PUBLICACION} debe ser de tipo "integer"`,
  }, {
    rule: async (val) => {
      const resp = await knex('REQ_PUBLICACIONES').where('IDEN_PUBLICACION', '=', val);
      if (resp.length === 0) throw new Error(`${labels.IDEN_PUBLICACION} no existe`);
    },
  }],
  FECH_INICIO: [{
    rule: 'required',
    label: labels.FECH_INICIO,
  }],
  FECH_TERMINO: [{
    rule: 'required',
    label: labels.FECH_TERMINO,
  }],
  NUMR_PRECIO: [{
    rule: 'required',
    label: labels.NUMR_PRECIO,
  }, {
    rule: 'number',
    message: `${labels.NUMR_PRECIO} debe ser de tipo "integer"`,
  }, {
    rule: 'greaterThanEqualTo:0',
    label: labels.NUMR_PRECIO,
  }, {
    rule: 'lessThanEqualTo:2000000000',
    label: labels.NUMR_PRECIO,
  }],
};

/**
 * Ejecuta validaciones de un modelo, retornando Promise
 * @param {bookshelf.Model} model Modelo a validar
 */
const validate = (model) => Checkit(validations, { language: 'es' }).run(model.toJSON());

// Se exporta la función
export default validate;
