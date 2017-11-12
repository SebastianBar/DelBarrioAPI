import { Model, Collection } from './model'
import Checkit from 'checkit'

/**
 * Obtener tipos de publicación.
 * @param {integer} req.params.id - ID de tipo de publicación (opcional).
 * @return {json} Tipo(s) de publicación. En caso fallido, mensaje de error.
 */
function GET (req, res) {
  const id = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(id != 0) {
    new Model({IDEN_TIPO_PUBLICACION: id}).fetch()
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
    new Collection().fetch()
      .then(entities => {
        res.json({error: false, data: entities.toJSON()})
      }).catch(err => {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  }
}

/**
 * Agregar nuevo tipo de publicación.
 * @param {string} req.body.NOMB_TIPO_PUBLICACION - Nombre descriptivo del tipo de publicación.
 * @return {json} Tipo de publicación. En caso fallido, mensaje de error.
 */
function POST (req, res) {
  new Model({
    NOMB_TIPO_PUBLICACION:  req.body.NOMB_TIPO_PUBLICACION
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
 * Actualiza un tipo de publicación.
 * @param {integer} req.params.id - ID del tipo de publicación.
 * @param {string} req.body.NOMB_TIPO_PUBLICACION - Nombre descriptivo del tipo de publicación (opcional).
 * @param {boolean} req.body.FLAG_VIGENTE - Define si el tipo de publicación está activo (opcional).
 * @return {json} Mensaje de éxito o error.
 */
function PUT (req, res) {
  new Model({IDEN_TIPO_PUBLICACION: req.params.id})
    .fetch({require: true})
    .then(entity => {
      entity.save({
        NOMB_TIPO_PUBLICACION:  (typeof req.body.NOMB_TIPO_PUBLICACION === 'undefined') ? entity.get('NOMB_TIPO_PUBLICACION') : req.body.NOMB_TIPO_PUBLICACION
      })
        .then(() => {
          res.json({error: false, data: {message: 'Entity successfully updated'}})
        }).catch(Checkit.Error, err => {
          res.status(400).json({error: true, data: err})
        }).catch(err => {
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
 * Elimina un tipo de publicación.
 * @param {integer} req.params.id - ID del tipo de publicación.
 * @return {json} Mensaje de éxito o error.
 */
function DELETE (req, res) {
  new Model({IDEN_TIPO_PUBLICACION: req.params.id})
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
