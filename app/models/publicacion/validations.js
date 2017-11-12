import Checkit from 'checkit'
import { knex } from '../../connection'

// Nombres de atributos en formato legible
const labels = {
  IDEN_EMPRENDEDOR: 'ID de emprendedor',
  IDEN_TIPO_PUBLICACION: 'ID de tipo de publicación',
  IDEN_CATEGORIA: 'ID de categoría',
  NOMB_PUBLICACION: 'Nombre de publicación',
  DESC_PUBLICACION: 'Descripción de publicación',
  NUMR_PRECIO: 'Precio de publicación',
  FLAG_CONTENIDO_ADULTO: 'Contenido adulto',
  FLAG_VIGENTE: 'Vigencia'
}

// Valores nativos de validaciones checkit en https://github.com/tgriesser/checkit
const validations = {
  IDEN_EMPRENDEDOR: [{
    rule: 'required',
    label: labels.IDEN_EMPRENDEDOR
  }, {
    rule: 'number',
    message: labels.IDEN_EMPRENDEDOR + ' debe ser de tipo "integer"'
  }, {
    rule: function (val){
      return knex('PER_EMPRENDEDORES').where('IDEN_EMPRENDEDOR', '=', val)
        .then(resp => {
          if (resp.length == 0){
            throw new Error(labels.IDEN_EMPRENDEDOR + ' no existe')
          }
        })
    }
  }],
  IDEN_TIPO_PUBLICACION: [{
    rule: 'required',
    label: labels.IDEN_TIPO_PUBLICACION
  }, {
    rule: 'number',
    message: labels.IDEN_TIPO_PUBLICACION + ' debe ser de tipo "integer"'
  }, {
    rule: function (val){
      return knex('REQ_TIPOS_PUBLICACION').where('IDEN_TIPO_PUBLICACION', '=', val)
        .then(resp => {
          if (resp.length == 0){
            throw new Error(labels.IDEN_TIPO_PUBLICACION + ' no existe')
          }
        })
    }
  }],
  IDEN_CATEGORIA: [{
    rule: 'required',
    label: labels.IDEN_CATEGORIA
  }, {
    rule: 'number',
    message: labels.IDEN_CATEGORIA + ' debe ser de tipo "integer"'
  }, {
    rule: function (val){
      return knex('REQ_CATEGORIAS').where('IDEN_CATEGORIA', '=', val)
        .then(resp => {
          if (resp.length == 0){
            throw new Error(labels.IDEN_CATEGORIA + ' no existe')
          }
        })
    }
  }],
  NOMB_PUBLICACION: [{
    rule: 'required',
    label: labels.NOMB_PUBLICACION
  }, {
    rule: 'minLength:5',
    label: labels.NOMB_PUBLICACION
  }, {
    rule: 'maxLength:100',
    label: labels.NOMB_PUBLICACION
  }],
  DESC_PUBLICACION: [{
    rule: 'required',
    label: labels.NOMB_PUBLICACION
  }, {
    rule: 'maxLength:5000',
    label: labels.NOMB_PUBLICACION
  }],
  NUMR_PRECIO: [{
    rule: 'required',
    label: labels.NUMR_PRECIO
  }, {
    rule: 'number',
    message: labels.NUMR_PRECIO + ' debe ser integer'
  }],
  FLAG_CONTENIDO_ADULTO: [{
    rule: 'required',
    label: labels.FLAG_CONTENIDO_ADULTO
  }, {
    rule: 'boolean',
    label: labels.FLAG_CONTENIDO_ADULTO
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

// Se exporta función
export default validate
