import { Model, Collection } from './model'
import Checkit from 'checkit'

/**
 * Obtener teléfonos.
 * @param {integer} req.params.id - ID de teléfono (opcional).
 * @return {json} Teléfono(s). En caso fallido, mensaje de error.
 */
const GET = async (req, res) => {
  const id = (typeof req.params.id === 'undefined' || isNaN(req.params.id)) ? 0 : parseInt(req.params.id)
  try {
    if (id != 0) {
      const entity = await new Model({ IDEN_FONO: id }).fetch({ withRelated: ['usuario'] })
      if (!entity) {
        res.status(404).json({ error: true, data: { message: 'Entity not found' } })
      } else {
        res.json({ error: false, data: entity.toJSON() })
      }
    } else {
      const entities = await new Collection().fetch({ withRelated: ['usuario'] })
      res.json({ error: false, data: entities.toJSON() })
    }
  } catch (err) {
    res.status(500).json({ error: true, data: { message: 'Internal error' } })
  }
}

/**
 * Agregar nuevo teléfono.
 * @param {integer} req.body.CODI_FONO - Código estandarizado de fono, el cual define si es fijo o móvil.
 * @param {string} req.body.NUMR_FONO - Número de teléfono.
 * @param {integer} req.body.IDEN_USUARIO - ID de Usuario dueño del teléfono.
 * @return {json} Teléfono. En caso fallido, mensaje de error.
 */
const POST = async (req, res) => {
  try {
    const entity = await new Model({
      CODI_FONO: req.body.CODI_FONO,
      NUMR_FONO: req.body.NUMR_FONO,
      IDEN_USUARIO: req.body.IDEN_USUARIO
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
 * Actualiza un teléfono.
 * @param {integer} req.params.id - ID de teléfono.
 * @param {integer} req.body.CODI_FONO - Código estandarizado de fono, el cual define si es fijo o móvil (opcional).
 * @param {string} req.body.NUMR_FONO - Número de teléfono (opcional).
 * @param {integer} req.body.IDEN_USUARIO - ID de Usuario dueño del teléfono (opcional).
 * @return {json} Mensaje de éxito o error.
 */
const PUT = async (req, res) => {
  try {
    const entity = await new Model({ IDEN_FONO: req.params.id }).fetch({ require: true })
    await entity.save({
      CODI_FONO: (typeof req.body.CODI_FONO === 'undefined') ? entity.get('CODI_FONO') : req.body.CODI_FONO,
      NUMR_FONO: (typeof req.body.NUMR_FONO === 'undefined') ? entity.get('NUMR_FONO') : req.body.NUMR_FONO,
      IDEN_USUARIO: (typeof req.body.IDEN_USUARIO === 'undefined') ? entity.get('IDEN_USUARIO') : req.body.IDEN_USUARIO
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
 * Elimina un teléfono.
 * @param {integer} req.params.id - ID de teléfono.
 * @return {json} Mensaje de éxito o error.
 */
const DELETE = async (req, res) => {
  try {
    await new Model({ IDEN_FONO: req.params.id }).destroy({ require: true })
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
