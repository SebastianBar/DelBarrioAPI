import { Model, Collection } from './model'
import Checkit from 'checkit'

/**
 * Obtener etiquetas.
 * @param {integer} req.params.id - ID de etiqueta (opcional).
 * @return {json} Etiqueta(s). En caso fallido, mensaje de error.
 */
const GET = async (req, res) => {
  const id = (typeof req.params.id === 'undefined' || isNaN(req.params.id)) ? 0 : parseInt(req.params.id)
  try {
    if (id != 0) {
      const entity = await new Model({ IDEN_ETIQUETA: id }).fetch()
      if (!entity) {
        res.status(404).json({ error: true, data: { message: 'Entity not found' } })
      } else {
        res.json({ error: false, data: entity.toJSON() })
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
 * Agregar nueva etiqueta.
 * @param {string} req.body.NOMB_ETIQUETA - Nombre de la etiqueta.
 * @return {json} Etiqueta. En caso fallido, mensaje de error.
 */
const POST = async (req, res) => {
  try {
    const entity = await new Model({ NOMB_ETIQUETA: req.body.NOMB_ETIQUETA }).save()
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
 * Actualiza una etiqueta.
 * @param {integer} req.params.id - ID de la etiqueta.
 * @param {string} req.body.NOMB_ETIQUETA - Nombre de la etiqueta (opcional).
 * @return {json} Mensaje de éxito o error.
 */
const PUT = async (req, res) => {
  try {
    const entity = await new Model({ IDEN_ETIQUETA: req.params.id }).fetch({ require: true })
    await entity.save({
      NOMB_ETIQUETA: (typeof req.body.NOMB_ETIQUETA === 'undefined') ? entity.get('NOMB_ETIQUETA') : req.body.NOMB_ETIQUETA,
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
 * Elimina una etiqueta.
 * @param {integer} req.params.id - ID de la etiqueta.
 * @return {json} Mensaje de éxito o error.
 */
const DELETE = async (req, res) => {
  try {
    await new Model({ IDEN_ETIQUETA: req.params.id }).destroy({ require: true })
    res.json({ error: false, data: { message: 'Entity successfully deleted' } })
  }
  catch (err) {
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
