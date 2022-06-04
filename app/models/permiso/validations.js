import Checkit from 'checkit';
import { knex } from '../../connection.js';

// Nombres de atributos en formato legible
const labels = {
  CODI_PERMISO: 'Código de Permiso',
  NOMB_PERMISO: 'Nombre de Permiso',
};

// Valores nativos de validaciones checkit en https://github.com/tgriesser/checkit
const validations = {
  CODI_PERMISO: [{
    rule: ['number', async (cod) => {
      const resp = await knex('SIS_PERMISOS').where('CODI_PERMISO', '=', cod);
      if (resp.length !== 0) throw new Error(`${labels.CODI_PERMISO} ya existe.`);
    }],
  }],
  NOMB_PERMISO: [{
    rule: 'required',
    label: labels.NOMB_PERMISO,
  }, {
    rule: 'string',
    label: labels.NOMB_PERMISO,
  }, {
    rule: 'maxLength:255',
    label: labels.NOMB_PERMISO,
  }],
};

/**
 * Ejecuta validaciones de un modelo, retornando Promise
 * @param {bookshelf.Model} model Modelo a validar
 */
const validate = (model) => Checkit(validations, { language: 'es' }).run(model.toJSON());

// Se exporta función
export default validate;
