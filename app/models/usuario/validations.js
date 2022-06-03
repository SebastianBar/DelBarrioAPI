import Checkit from 'checkit'
import { knex } from '../../connection'
import { genHash } from '../../auth/_helpers'

// Nombres de atributos en formato legible
const labels = {
  IDEN_ROL: 'ID de rol',
  EMAIL_USUARIO: 'Correo electrónico',
  DESC_PASSWORD: 'Contraseña',
  FLAG_VIGENTE: 'Vigencia',
  FLAG_BAN: 'Baneo'
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
    rule: async val => {
      const resp = await knex('SIS_ROLES').where('IDEN_ROL', '=', val)
      if (resp.length == 0) throw new Error(labels.IDEN_ROL + ' no existe')
    }
  }],
  EMAIL_USUARIO: [{
    rule: 'required',
    label: labels.EMAIL_USUARIO
  }, {
    rule: 'email',
    label: labels.EMAIL_USUARIO
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
  }],
  FLAG_BAN: [{
    rule: 'boolean',
    label: labels.FLAG_BAN
  }]
}

// Validación de mail exclusiva para POST y PUT con EMAIL_USUARIO actualizado
const mailComparison = {
  rule: async val => {
    const resp = await knex('USR_USUARIOS').where('EMAIL_USUARIO', '=', val)
    if (resp.length > 0) throw new Error(labels.EMAIL_USUARIO + ' ya está registrado')
  }
}

/**
 * Ejecuta validaciones de un modelo, retornando Promise
 * @param {bookshelf.Model} model Modelo a validar
 */
const validate = async model => {
  const verificateMail = ((typeof model.attributes.IDEN_USUARIO === 'undefined') || model.attributes.EMAIL_USUARIO !== model._previousAttributes.EMAIL_USUARIO)
  if (verificateMail) {
    if (validations.EMAIL_USUARIO.length === 2)
      validations.EMAIL_USUARIO.push(mailComparison)
  } else {
    if (validations.EMAIL_USUARIO.length === 3)
      validations.EMAIL_USUARIO.pop()
  }

  await Checkit(validations, { language: 'es' }).run(model.toJSON())

  // If password isn't a hash, update it before saving
  if (!/^\$2[ayb]\$.{56}$/.test(model.attributes.DESC_PASSWORD)) {
    model.attributes.DESC_PASSWORD = genHash(model.attributes.DESC_PASSWORD)
  }
}

// Se exporta la función
export default validate
