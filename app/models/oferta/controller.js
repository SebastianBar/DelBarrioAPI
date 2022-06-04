import { Model, Collection } from './model'
import Checkit from 'checkit'

/**
 * Obtener ofertas.
 * @param {integer} req.params.id - ID de oferta (opcional).
 * @return {json} Oferta(s). En caso fallido, mensaje de error.
 */
const GET = async (req, res) => {
  const id = (typeof req.params.id === 'undefined' || isNaN(req.params.id)) ? 0 : parseInt(req.params.id)
  try {
    if (id != 0) {
      const entity = await new Model({ IDEN_OFERTA: id }).fetch({ withRelated: ['publicacion'] })
      if (!entity) {
        res.status(404).json({ error: true, data: { message: 'Entity not found' } })
      } else {
        res.json({ error: false, data: entity.toJSON() })
      }
    } else {
      const entities = await new Collection().fetch({ withRelated: ['publicacion'] })
      res.json({ error: false, data: entities.toJSON() })
    }
  } catch (err) {
    res.status(500).json({ error: true, data: { message: 'Internal error' } })
  }
}

/**
 * Agregar nueva oferta.
 * @param {integer} req.body.IDEN_PUBLICACION - ID de publicación a la que le corresponde esta oferta.
 * @param {datetime} req.body.FECH_INICIO - Fecha de inicio de la oferta.
 * @param {datetime} req.body.FECH_TERMINO - Fecha de término de la oferta.
 * @param {integer} req.body.NUMR_PRECIO - Precio de la oferta.
 * @return {json} Oferta. En caso fallido, mensaje de error.
 */
const POST = async (req, res) => {
  try {
    const entity = await new Model({
      IDEN_PUBLICACION: req.body.IDEN_PUBLICACION,
      FECH_INICIO: req.body.FECH_INICIO,
      FECH_TERMINO: req.body.FECH_TERMINO,
      NUMR_PRECIO: req.body.NUMR_PRECIO
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
 * Actualiza una oferta.
 * @param {integer} req.params.id - ID de oferta.
 * @param {integer} req.body.IDEN_PUBLICACION - ID de publicación a la que le corresponde esta oferta (opcional).
 * @param {datetime} req.body.FECH_INICIO - Fecha de inicio de la oferta (opcional).
 * @param {datetime} req.body.FECH_TERMINO - Fecha de término de la oferta (opcional).
 * @param {integer} req.body.NUMR_PRECIO - Precio de la oferta (opcional).
 * @return {json} Mensaje de éxito o error.
 */
const PUT = async (req, res) => {
  try {
    const entity = await new Model({ IDEN_OFERTA: req.params.id }).fetch({ require: true })
    await entity.save({
      IDEN_PUBLICACION: (typeof req.body.IDEN_PUBLICACION === 'undefined') ? entity.get('IDEN_PUBLICACION') : req.body.IDEN_PUBLICACION,
      FECH_INICIO: (typeof req.body.FECH_INICIO === 'undefined') ? entity.get('FECH_INICIO') : req.body.FECH_INICIO,
      FECH_TERMINO: (typeof req.body.FECH_TERMINO === 'undefined') ? entity.get('FECH_TERMINO') : req.body.FECH_TERMINO,
      NUMR_PRECIO: (typeof req.body.NUMR_PRECIO === 'undefined') ? entity.get('NUMR_PRECIO') : req.body.NUMR_PRECIO
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
 * Elimina una oferta.
 * @param {integer} req.params.id - ID de oferta.
 * @return {json} Mensaje de éxito o error.
 */
const DELETE = async (req, res) => {
  try {
    await new Model({ IDEN_OFERTA: req.params.id }).destroy({ require: true })
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
