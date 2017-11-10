import Checkit from 'checkit'

// Nombres de atributos en formato legible
const labels = {
  DESC_EMPRENDEDOR: 'Descripción del emprendedor',
  DESC_CLAVE_MUNICIPALIDAD: 'Clave de municipalidad',
  DESC_NOMBRE_FANTASIA: 'Nombre de fantasía del emprendedor',
  DESC_NOMBRE_EMPRESA: 'Nombre real de la empresa',
  IDEN_USUARIO: 'ID de usuario' // ToDo: Verificar. Se supone que va a estar creada de antes la empresa
}

// Valores nativos de validaciones checkit en https://github.com/tgriesser/checkit
const validations = {
  DESC_EMPRENDEDOR: [{
    rule: 'required',
    label: labels.DESC_EMPRENDEDOR
  }, {
    rule: 'string',
    label: labels.DESC_EMPRENDEDOR
  }, {
    rule: 'maxLength:255',
    label: labels.DESC_EMPRENDEDOR
  }],
  DESC_CLAVE_MUNICIPALIDAD: [{ // ToDo: Verificar método de validación
    rule: 'required',
    label: labels.DESC_CLAVE_MUNICIPALIDAD
  }],
  DESC_NOMBRE_FANTASIA: [{
    rule: 'required',
    label: labels.DESC_NOMBRE_FANTASIA
  }, {
    rule: 'maxLength:255',
    label: labels.DESC_NOMBRE_FANTASIA
  }],
  DESC_NOMBRE_EMPRESA: [{
    rule: 'required',
    label: labels.DESC_NOMBRE_EMPRESA
  }, {
    rule: 'maxLength:255',
    label: labels.DESC_NOMBRE_EMPRESA
  }]
}

/**
 * Ejecuta validaciones de un modelo, retornando Promise
 * @param {bookshelf.Model} model Modelo a validar
 */
function validate (model) {
  return Checkit(validations, {language: 'es'}).run(model.toJSON())
}

// Se exporta función
export default validate
