import { Model, Collection } from './model'
import Checkit from 'checkit'
import { filter } from './_helpers'

/**
 * Obtener motivos de deshabilitación.
 * @param {integer} req.params.id - ID de motivo de deshabilitación (opcional).
 * @return {json} Motivo(s) de deshabilitación. En caso fallido, mensaje de error.
 */
const GET = async (req, res) => {
  const id = (typeof req.params.id === 'undefined' || isNaN(req.params.id)) ? 0 : parseInt(req.params.id)
  try {
    if (id != 0) {
      const entity = await new Model({ IDEN_MOTIVO_DESHABILITACION: id }).fetch()
      if (!entity) {
        res.status(404).json({ error: true, data: { message: 'Entity not found' } })
      } else {
        res.json({ error: false, data: filter.GETsingle(entity) })
      }
    } else {
      const entities = await new Collection().fetch()
      res.json({ error: false, data: entities.toJSON() })
    }
  } catch (err) {
    res.status(500).json({ error: true, data: { message: 'Internal error' } })
  }
}

/**
 * Agregar nuevo motivo de deshabilitación.
 * @param {string} req.body.NOMB_MOTIVO_DESHABILITACION - Nombre descriptivo del motivo de deshabilitación.
 * @param {boolean} req.body.FLAG_VIGENTE - Define si el motivo de deshabilitación está activo (opcional, por defecto true).
 * @return {json} Motivo de deshabilitación. En caso fallido, mensaje de error.
 */
const POST = async (req, res) => {
  try {
    const entity = await new Model({
      NOMB_MOTIVO_DESHABILITACION: req.body.NOMB_MOTIVO_DESHABILITACION,
      FLAG_VIGENTE: req.body.FLAG_VIGENTE
    }).save()
    res.json({ error: false, data: entity.toJSON() })
  } catch (err) {
    if (err instanceof Checkit.Error) {
      res.status(400).json({ error: true, data: err })
    } else {
      res.status(500).json({ error: true, data: { message: 'Internal error' } })
    }
  }
}

/**
 * Actualiza un motivo de deshabilitación.
 * @param {integer} req.params.id - ID del motivo de deshabilitación.
 * @param {string} req.body.NOMB_MOTIVO_DESHABILITACION - Nombre descriptivo del motivo de deshabilitación (opcional).
 * @param {boolean} req.body.FLAG_VIGENTE - Define si el motivo de deshabilitación está activo (opcional).
 * @return {json} Mensaje de éxito o error.
 */
const PUT = async (req, res) => {
  try {
    const entity = await new Model({ IDEN_MOTIVO_DESHABILITACION: req.params.id }).fetch({ require: true })
    await entity.save({
      NOMB_MOTIVO_DESHABILITACION: (typeof req.body.NOMB_MOTIVO_DESHABILITACION === 'undefined') ? entity.get('NOMB_MOTIVO_DESHABILITACION') : req.body.NOMB_MOTIVO_DESHABILITACION,
      FLAG_VIGENTE: (typeof req.body.FLAG_VIGENTE === 'undefined') ? entity.get('FLAG_VIGENTE') : req.body.FLAG_VIGENTE,
    })
    res.json({ error: false, data: { message: 'Entity successfully updated' } })
  } catch (err) {
    if (err instanceof Checkit.Error) {
      res.status(400).json({ error: true, data: err })
    } else if (err instanceof Model.NotFoundError) {
      res.status(404).json({ error: true, data: { message: 'Entity not found' } })
    } else {
      res.status(500).json({ error: true, data: { message: 'Internal error' } })
    }
  }
}

/**
 * Elimina un motivo de deshabilitación.
 * @param {integer} req.params.id - ID del motivo de deshabilitación.
 * @return {json} Mensaje de éxito o error.
 */
const DELETE = async (req, res) => {
  try {
    await new Model({ IDEN_MOTIVO_DESHABILITACION: req.params.id }).destroy({ require: true })
    res.json({ error: false, data: { message: 'Entity successfully deleted' } })
  } catch (err) {
    if (err instanceof Model.NoRowsDeletedError) {
      res.status(404).json({ error: true, data: { message: 'Entity not found' } })
    } else {
      res.status(500).json({ error: true, data: { message: 'Internal error' } })
    }
  }
}

/* Se exportan los métodos */
module.exports = {
  GET,
  POST,
  PUT,
  DELETE
}
