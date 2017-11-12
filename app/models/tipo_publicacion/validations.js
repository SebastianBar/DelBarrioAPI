import Checkit from 'checkit'

// Nombres de atributos en formato legible
const labels = {
  NOMB_TIPO_PUBLICACION: 'Nombre',
}

// Valores nativos de validaciones Checkit en https://github.com/tgriesser/checkit
const validations = {
  NOMB_TIPO_PUBLICACION: [{
    rule: 'required',
    label: labels.NOMB_TIPO_PUBLICACION
  }, {
    rule: 'minLength:4',
    label: labels.NOMB_TIPO_PUBLICACION
  }, {
    rule: 'maxLength:20',
    label: labels.NOMB_TIPO_PUBLICACION
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
