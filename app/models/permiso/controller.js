import { Model, Collection } from './model.js';

/**
 * Obtener permisos.
 * @param {integer} req.params.id - ID del permiso (opcional).
 * @return {json} Permiso(s). En caso fallido, mensaje de error.
 */
export const GET = async (req, res) => {
  const id = (typeof req.params.id === 'undefined' || Number.isNaN(req.params.id)) ? 0 : Number.parseInt(req.params.id, 10);
  try {
    if (id !== 0) {
      const entity = await new Model({ IDEN_PERMISO: id }).fetch({ withRelated: ['roles'] });
      if (!entity) {
        res.status(404).json({ error: true, data: { message: 'Entity not found' } });
      } else {
        res.json({ error: false, data: entity.toJSON() });
      }
    } else {
      const entities = await new Collection().fetch({ withRelated: ['roles'] });
      res.json({ error: false, data: entities.toJSON() });
    }
  } catch (err) {
    res.status(500).json({ error: true, data: { message: 'Internal error' } });
  }
};
