import Checkit from 'checkit'

// Nombres de atributos en formato legible
const labels = {
  NOMB_RUBRO: 'Nombre del rol',
  FLAG_VIGENTE: 'Vigencia'
}

// Valores nativos de validaciones Checkit en https://github.com/tgriesser/checkit
const validations = {
  NOMB_RUBRO: [{
    rule: 'required',
    label: labels.NOMB_ROL
  }, {
    rule: 'string',
    label: labels.NOMB_ROL
  }, {
    rule: 'maxLength:255',
    label: labels.NOMB_ROL
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
