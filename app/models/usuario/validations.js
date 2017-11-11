import Checkit from 'checkit'
import { knex } from '../../connection'

// Nombres de atributos en formato legible
const labels = {
  IDEN_ROL: 'ID de rol',
  RUT_USUARIO: 'RUT',
  DV_USUARIO: 'Dígito verificador',
  EMAIL_USUARIO: 'Correo electrónico',
  DESC_PASSWORD: 'Contraseña',
  FLAG_VIGENTE: 'Vigencia'
}

// Valores nativos de validaciones Checkit en https://github.com/tgriesser/checkit
const validations = {
  IDEN_ROL: [{
    rule: 'required',
    label: labels.IDEN_ROL
  }, {
    rule: 'number',
    message: labels.IDEN_ROL + ' debe ser de tipo "integer"'
  }, {
    rule: function (val){
      return knex('SIS_ROLES').where('IDEN_ROL', '=', val)
        .then(resp => {
          if (resp.length == 0){
            throw new Error(labels.IDEN_ROL + ' no existe')
          }
        })
    }
  }],
  RUT_USUARIO: [{
    rule: 'required',
    label: labels.RUT_USUARIO
  }, {
    rule: 'number',
    message: labels.RUT_USUARIO + ' debe ser de tipo "integer"'
  }],
  DV_USUARIO: [{
    rule: 'required',
    label: labels.DV_USUARIO
  }, {
    rule: 'string',
    label: labels.DV_USUARIO
  }, {
    rule: 'maxLength:1',
    label: labels.DV_USUARIO // TESTEAR
  }],
  EMAIL_USUARIO: [{
    rule: 'required',
    label: labels.EMAIL_USUARIO
  }, {
    rule: 'email',
    label: labels.EMAIL_USUARIO
  }, {
    rule: function (val){
      return knex('USR_USUARIOS').where('EMAIL_USUARIO', '=', val)
        .then(resp => {
          if (resp.length > 0){
            throw new Error(labels.EMAIL_USUARIO + ' ya está registrado')
          }
        })
    }
  }],
  DESC_PASSWORD: [{
    rule: 'required',
    label: labels.DESC_PASSWORD
  }, {
    rule: 'string',
    label: labels.DESC_PASSWORD
  }, {
    rule: 'minLength:6',
    label: labels.DESC_PASSWORD
  }],
  FLAG_VIGENTE: [{
    rule: 'boolean',
    label: labels.FLAG_VIGENTE
  }]
}

/**
 * Ejecuta validaciones de un modelo, retornando Promise
 * @param {bookshelf.Model} model Modelo a validar
 */
function validate (model) {
  return Checkit(validations, {language: 'es'}).run(model.toJSON())
}

// Se exporta la función
export default validate
