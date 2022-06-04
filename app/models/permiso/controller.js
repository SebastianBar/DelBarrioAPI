import { Model, Collection } from './model'

/**
 * Obtener permisos.
 * @param {integer} req.params.id - ID del permiso (opcional).
 * @return {json} Permiso(s). En caso fallido, mensaje de error.
 */
const GET = async (req, res) => {
  const id = (typeof req.params.id === 'undefined' || isNaN(req.params.id)) ? 0 : parseInt(req.params.id)
  try {
    if (id != 0) {
      const entity = await new Model({ IDEN_PERMISO: id }).fetch({ withRelated: ['roles'] })
      if (!entity) {
        res.status(404).json({ error: true, data: { message: 'Entity not found' } })
      } else {
        res.json({ error: false, data: entity.toJSON() })
      }
    } else {
      const entities = await new Collection().fetch({ withRelated: ['roles'] })
      res.json({ error: false, data: entities.toJSON() })
    }
  } catch (err) {
    res.status(500).json({ error: true, data: { message: 'Internal error' } })
  }
}

/* Se exportan los métodos */
module.exports = {
  GET
}
