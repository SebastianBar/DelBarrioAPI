import Checkit from 'checkit'
// import { Model as Categoria } from './model'

const validations = {
  NOMB_CATEGORIA: [{
    rule: 'required',
    label: 'Nombre de categoría'
  }, {
    rule: 'minLength:5',
    label: 'Nombre de categoría'
  }, {
    rule: 'maxLength:20',
    label: 'Nombre de categoría'
  }],
  FLAG_VIGENTE: [{
    rule: 'boolean',
    label: 'Vigencia'
  }]
}

function validation () {
  return Checkit(validations, {language: 'es'})
}

export default validation
