import { Model, Collection } from './model'
import Checkit from 'checkit'

/**
 * Obtener emprendedores.
 * @param {integer} req.params.id - ID del emprendedor (opcional).
 * @return {json} Emprendedor(es). En caso fallido, mensaje de error.
 */
function GET (req, res) {
  const id = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(id != 0) {
    new Model({IDEN_EMPRENDEDOR: id}).fetch({withRelated: ['usuario', 'rubros']})
      .then(entity => {
        if(!entity) {
          res.status(404).json({error: true, data: {message: 'Entity not found'}})
        } else {
          res.json({error: false, data: entity.toJSON()})
        }
      }).catch(err => {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  } else {
    new Collection().fetch({withRelated: ['usuario', 'rubros']})
      .then(entities => {
        res.json({error: false, data: entities.toJSON()})
      }).catch(err => {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  }
}

/**
 * Agregar nuevo emprendedor.
 * @param {integer} req.body.IDEN_USUARIO - ID de usuario (opcional).
 * @param {string} req.body.DESC_EMPRENDEDOR - Descripción breve de la empresa.
 * @param {string} req.body.DESC_CLAVE_MUNICIPALIDAD - Clave otorgada por la Municipalidad para permitir el registro en el sistema.
 * @param {string} req.body.DESC_NOMBRE_FANTASIA - Nombre de fantasía de la Empresa.
 * @param {string} req.body.DESC_NOMBRE_EMPRESA - Nombre de la empresa ante el SII.
 * @return {json} Emprendedor. En caso fallido, mensaje de error.
 */
function POST (req, res) {
  new Model({
    IDEN_USUARIO:             req.body.IDEN_USUARIO,
    DESC_EMPRENDEDOR:         req.body.DESC_EMPRENDEDOR,
    DESC_CLAVE_MUNICIPALIDAD: req.body.DESC_CLAVE_MUNICIPALIDAD,
    DESC_NOMBRE_FANTASIA:     req.body.DESC_NOMBRE_FANTASIA,
    DESC_NOMBRE_EMPRESA:      req.body.DESC_NOMBRE_EMPRESA
  }).save()
    .then(entity => {
      res.json({error: false, data: entity.toJSON()})
    }).catch(Checkit.Error, err => {
      res.status(400).json({error: true, data: err})
    }).catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

/**
 * Actualiza un emprendedor.
 * @param {integer} req.params.id - ID del emprendedor.
 * @param {integer} req.body.IDEN_USUARIO - ID de usuario (opcional).
 * @param {string} req.body.DESC_EMPRENDEDOR - Descripción breve de la empresa (opcional).
 * @param {string} req.body.DESC_CLAVE_MUNICIPALIDAD - Clave otorgada por la Municipalidad para permitir el registro en el sistema (opcional).
 * @param {string} req.body.DESC_NOMBRE_FANTASIA - Nombre de fantasía de la Empresa (opcional).
 * @param {string} req.body.DESC_NOMBRE_EMPRESA - Nombre de la empresa ante el SII (opcional).
 * @return {json} Mensaje de éxito o error.
 */
function PUT (req, res) {
  new Model({IDEN_EMPRENDEDOR: req.params.id})
    .fetch({require: true})
    .then(entity => {
      entity.save({
        IDEN_USUARIO:             (typeof req.body.IDEN_USUARIO === 'undefined') ? entity.get('IDEN_USUARIO') : req.body.IDEN_USUARIO,
        DESC_EMPRENDEDOR:         (typeof req.body.DESC_EMPRENDEDOR === 'undefined') ? entity.get('DESC_EMPRENDEDOR') : req.body.DESC_EMPRENDEDOR,
        DESC_CLAVE_MUNICIPALIDAD: (typeof req.body.DESC_CLAVE_MUNICIPALIDAD === 'undefined') ? entity.get('DESC_CLAVE_MUNICIPALIDAD') : req.body.DESC_CLAVE_MUNICIPALIDAD,
        DESC_NOMBRE_FANTASIA:     (typeof req.body.DESC_NOMBRE_FANTASIA === 'undefined') ? entity.get('DESC_NOMBRE_FANTASIA') : req.body.DESC_NOMBRE_FANTASIA,
        DESC_NOMBRE_EMPRESA:      (typeof req.body.DESC_NOMBRE_EMPRESA === 'undefined') ? entity.get('DESC_NOMBRE_EMPRESA') : req.body.DESC_NOMBRE_EMPRESA
      })
        .then(() => {
          res.json({error: false, data: {message: 'Entity successfully updated'}})
        })
        .catch(Checkit.Error, err => {
          res.status(400).json({error: true, data: err})
        })
        .catch(err => {
          res.status(500).json({error: true, data: {message: 'Internal error'}})
          throw err
        })
    })
    .catch(Model.NotFoundError, () => {
      res.status(404).json({error: true, data: {message: 'Entity not found'}})
    })
    .catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

/**
 * Elimina un emprendedor.
 * @param {integer} req.params.id - ID del emprendedor.
 * @return {json} Mensaje de éxito o error.
 */
function DELETE (req, res) {
  new Model({IDEN_EMPRENDEDOR: req.params.id})
    .destroy({require: true})
    .then(() => {
      res.json({error: false, data: {message: 'Entity successfully deleted'}})
    })
    .catch(Model.NoRowsDeletedError, () => {
      res.status(404).json({error: true, data: {message: 'Entity not found'}})
    })
    .catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

/* Se exportan los métodos */
module.exports = {
  GET,
  POST,
  PUT,
  DELETE
}
