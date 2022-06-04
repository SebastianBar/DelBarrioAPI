import { Model, Collection } from './model'
import Checkit from 'checkit'

/**
 * Obtener roles.
 * @param {integer} req.params.id - ID de rol (opcional).
 * @return {json} Rol(es). En caso fallido, mensaje de error.
 */
const GET = async (req, res) => {
  const id = (typeof req.params.id === 'undefined' || isNaN(req.params.id)) ? 0 : parseInt(req.params.id)
  try {
    if (id != 0) {
      const entity = await new Model({ IDEN_ROL: id }).fetch({ withRelated: ['permisos'] })
      if (!entity) {
        res.status(404).json({ error: true, data: { message: 'Entity not found' } })
      } else {
        res.json({ error: false, data: entity.toJSON() })
      }
    } else {
      const entities = await new Collection().fetch({ withRelated: ['permisos'] })
      res.json({ error: false, data: entities.toJSON() })
    }
  } catch (err) {
    res.status(500).json({ error: true, data: { message: 'Internal error' } })
  }
}

/**
 * Agregar nuevo rol.
 * @param {integer} req.body.CODI_ROL - Código único estandarizado del rol.
 * @param {string} req.body.NOMB_ROL - Nombre del rol.
 * @return {json} Rol. En caso fallido, mensaje de error.
 */
const POST = async (req, res) => {
  try {
    const entity = await new Model({
      CODI_ROL: req.body.CODI_ROL,
      NOMB_ROL: req.body.NOMB_ROL
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
 * Actualiza un rol.
 * @param {integer} req.params.id - ID de rol.
 * @param {integer} req.body.CODI_ROL - Código único estandarizado del rol (opcional).
 * @param {string} req.body.NOMB_ROL - Nombre del rol (opcional).
 * @return {json} Mensaje de éxito o error.
 */
const PUT = async (req, res) => {
  try {
    const entity = await new Model({ IDEN_ROL: req.params.id }).fetch({ require: true })
    await entity.save({
      CODI_ROL: (typeof req.body.CODI_ROL === 'undefined') ? entity.get('CODI_ROL') : req.body.CODI_ROL,
      NOMB_ROL: (typeof req.body.NOMB_ROL === 'undefined') ? entity.get('NOMB_ROL') : req.body.NOMB_ROL,
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
 * Elimina un rol.
 * @param {integer} req.params.id - ID de rol.
 * @return {json} Mensaje de éxito o error.
 */
const DELETE = async (req, res) => {
  try {
    await new Model({ IDEN_ROL: req.params.id }).destroy({ require: true })
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
