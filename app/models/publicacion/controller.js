import { Model, Collection } from './model'
import Checkit from 'checkit'

/**
 * Obtener publicaciones.
 * @param {integer} req.params.id - ID de publicación (opcional).
 * @return {json} Publicación(es). En caso fallido, mensaje de error.
 */
function GET (req, res) {
  const id = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(id != 0) {
    new Model({IDEN_PUBLICACION: id}).fetch({withRelated: ['emprendedor', 'tipo_publicacion', 'categoria', 'ofertas', 'comentarios']})
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
 * Agregar nueva publicación.
 * @param {integer} req.body.IDEN_EMPRENDEDOR - ID de Emprendedor al que corresponde esta publicación.
 * @param {integer} req.body.IDEN_TIPO_PUBLICACION - ID de Tipo_Publicación al que corresponde esta publicación.
 * @param {integer} req.body.IDEN_CATEGORIA - ID de Categoría a la que corresponde esta publicación.
 * @param {string} req.body.NOMB_PUBLICACION - Título de la publicación.
 * @param {string} req.body.DESC_PUBLICACION - Texto descriptivo de la publicación.
 * @param {integer} req.body.NUMR_PRECIO - Precio de publicación.
 * @param {date} req.body.FECH_CREACION - Fecha de creación de la publicación (opcional, por defecto now()).
 * @param {boolean} req.body.FLAG_CONTENIDO_ADULTO - Define si la publicación posee contenido adulto (opcional, por defecto false).
 * @param {boolean} req.body.FLAG_VIGENTE - Define si la publicación está activa (opcional, por defecto true).
 * @return {json} Publicación. En caso fallido, mensaje de error.
 */
function POST (req, res) {
  new Model({
    IDEN_EMPRENDEDOR:       req.body.IDEN_EMPRENDEDOR,
    IDEN_TIPO_PUBLICACION:  req.body.IDEN_TIPO_PUBLICACION,
    IDEN_CATEGORIA:         req.body.IDEN_CATEGORIA,
    NOMB_PUBLICACION:       req.body.NOMB_PUBLICACION,
    DESC_PUBLICACION:       req.body.DESC_PUBLICACION,
    NUMR_PRECIO:            req.body.NUMR_PRECIO,
    FECH_CREACION:          req.body.FECH_CREACION,
    FLAG_CONTENIDO_ADULTO:  req.body.FLAG_CONTENIDO_ADULTO,
    FLAG_VIGENTE:           req.body.FLAG_VIGENTE
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
 * Actualiza una publicación.
 * @param {integer} req.params.id - ID de la publicación.
 * @param {integer} req.body.IDEN_EMPRENDEDOR - ID de Emprendedor al que corresponde esta publicación (opcional).
 * @param {integer} req.body.IDEN_TIPO_PUBLICACION - ID de Tipo_Publicación al que corresponde esta publicación (opcional).
 * @param {integer} req.body.IDEN_CATEGORIA - ID de Categoría a la que corresponde esta publicación (opcional).
 * @param {string} req.body.NOMB_PUBLICACION - Título de la publicación (opcional).
 * @param {string} req.body.DESC_PUBLICACION - Texto descriptivo de la publicación (opcional).
 * @param {integer} req.body.NUMR_PRECIO - Precio de publicación (opcional).
 * @param {date} req.body.FECH_CREACION - Fecha de creación de la publicación (opcional).
 * @param {boolean} req.body.FLAG_CONTENIDO_ADULTO - Define si la publicación posee contenido adulto (opcional).
 * @param {boolean} req.body.FLAG_VIGENTE - Define si la publicación está activa (opcional).
 * @return {json} Mensaje de éxito o error.
 */
function PUT (req, res) {
  new Model({IDEN_PUBLICACION: req.params.id})
    .fetch({require: true})
    .then(entity => {
      entity.save({
        IDEN_EMPRENDEDOR:       (typeof req.body.IDEN_EMPRENDEDOR === 'undefined') ? entity.get('IDEN_EMPRENDEDOR') : req.body.IDEN_EMPRENDEDOR,
        IDEN_TIPO_PUBLICACION:  (typeof req.body.IDEN_TIPO_PUBLICACION === 'undefined') ? entity.get('IDEN_TIPO_PUBLICACION') : req.body.IDEN_TIPO_PUBLICACION,
        IDEN_CATEGORIA:         (typeof req.body.IDEN_CATEGORIA === 'undefined') ? entity.get('IDEN_CATEGORIA') : req.body.IDEN_CATEGORIA,
        NOMB_PUBLICACION:       (typeof req.body.NOMB_PUBLICACION === 'undefined') ? entity.get('NOMB_PUBLICACION') : req.body.NOMB_PUBLICACION,
        DESC_PUBLICACION:       (typeof req.body.DESC_PUBLICACION === 'undefined') ? entity.get('DESC_PUBLICACION') : req.body.DESC_PUBLICACION,
        NUMR_PRECIO:            (typeof req.body.NUMR_PRECIO === 'undefined') ? entity.get('NUMR_PRECIO') : req.body.NUMR_PRECIO,
        FECH_CREACION:          (typeof req.body.FECH_CREACION === 'undefined') ? entity.get('FECH_CREACION') : req.body.FECH_CREACION,
        FLAG_CONTENIDO_ADULTO:  (typeof req.body.FLAG_CONTENIDO_ADULTO === 'undefined') ? entity.get('FLAG_CONTENIDO_ADULTO') : req.body.FLAG_CONTENIDO_ADULTO,
        FLAG_VIGENTE:           (typeof req.body.FLAG_VIGENTE === 'undefined') ? entity.get('FLAG_VIGENTE') : req.body.FLAG_VIGENTE
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
 * Elimina una publicación.
 * @param {integer} req.params.id - ID de la publicación.
 * @return {json} Mensaje de éxito o error.
 */
function DELETE (req, res) {
  new Model({IDEN_PUBLICACION: req.params.id})
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
