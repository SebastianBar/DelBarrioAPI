import Checkit from 'checkit';
import { Model, Collection } from './model.js';
import { filter } from './_helpers.js';
/**
 * Obtener rubros.
 * @param {integer} req.params.id - ID de rubro (opcional).
 * @return {json} Rubro(s). En caso fallido, mensaje de error.
 */
export const GET = async (req, res) => {
  const id = (typeof req.params.id === 'undefined' || Number.isNaN(req.params.id)) ? 0 : Number.parseInt(req.params.id, 10);
  try {
    if (id !== 0) {
      const entity = await new Model({ IDEN_RUBRO: id }).fetch();
      if (!entity) {
        res.status(404).json({ error: true, data: { message: 'Entity not found' } });
      } else {
        res.json({ error: false, data: filter.GETsingle(entity) });
      }
    } else {
      const entities = await new Collection().fetch();
      res.json({ error: false, data: entities.toJSON() });
    }
  } catch (err) {
    res.status(500).json({ error: true, data: { message: 'Internal error' } });
  }
};

/**
 * Agregar nuevo rubro.
 * @param {string} req.body.NOMB_RUBRO - Nombre del rubro.
 * @param {boolean} req.body.FLAG_VIGENTE - Define si el rubro está activo (opcional, por defecto true).
 * @return {json} Rubro. En caso fallido, mensaje de error.
 */
export const POST = async (req, res) => {
  try {
    const entity = await new Model({
      NOMB_RUBRO: req.body.NOMB_RUBRO,
      FLAG_VIGENTE: req.body.FLAG_VIGENTE,
    }).save();
    res.json({ error: false, data: entity.toJSON() });
  } catch (err) {
    if (err instanceof Checkit.Error) {
      res.status(400).json({ error: true, data: err });
    } else {
      res.status(500).json({ error: true, data: { message: 'Internal error' } });
    }
  }
};

/**
 * Actualiza un rubro.
 * @param {integer} req.params.id - ID del rubro.
 * @param {string} req.body.NOMB_RUBRO - Nombre del rubro (opcional).
 * @param {boolean} req.body.FLAG_VIGENTE - Define si el rubro está activo (opcional).
 * @return {json} Mensaje de éxito o error.
 */
export const PUT = async (req, res) => {
  try {
    const entity = await new Model({ IDEN_RUBRO: req.params.id }).fetch({ require: true });
    await entity.save({
      NOMB_RUBRO: (typeof req.body.NOMB_RUBRO === 'undefined') ? entity.get('NOMB_RUBRO') : req.body.NOMB_RUBRO,
      FLAG_VIGENTE: (typeof req.body.FLAG_VIGENTE === 'undefined') ? entity.get('FLAG_VIGENTE') : req.body.FLAG_VIGENTE,
    });
    res.json({ error: false, data: { message: 'Entity successfully updated' } });
  } catch (err) {
    if (err instanceof Checkit.Error) {
      res.status(400).json({ error: true, data: err });
    } else if (err instanceof Model.NotFoundError) {
      res.status(404).json({ error: true, data: { message: 'Entity not found' } });
    } else {
      res.status(500).json({ error: true, data: { message: 'Internal error' } });
    }
  }
};

/**
 * Elimina un rubro.
 * @param {integer} req.params.id - ID del rubro.
 * @return {json} Mensaje de éxito o error.
 */
export const DELETE = async (req, res) => {
  try {
    await new Model({ IDEN_RUBRO: req.params.id }).destroy({ require: true });
    res.json({ error: false, data: { message: 'Entity successfully deleted' } });
  } catch (err) {
    if (err instanceof Model.NoRowsDeletedError) {
      res.status(404).json({ error: true, data: { message: 'Entity not found' } });
    } else {
      res.status(500).json({ error: true, data: { message: 'Internal error' } });
    }
  }
};
