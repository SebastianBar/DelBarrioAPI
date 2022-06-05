import Checkit from 'checkit';
import { Model, Collection } from './model.js';
import { filter } from './_helpers.js';

/**
 * Obtener FAQs.
 * @param {integer} req.params.id - ID de FAQ (opcional).
 * @return {json} FAQ(s). En caso fallido, mensaje de error.
 */
export const GET = async (req, res) => {
  const id = (typeof req.params.id === 'undefined' || Number.isNaN(req.params.id)) ? 0 : Number.parseInt(req.params.id, 10);
  try {
    if (id !== 0) {
      const entity = await new Model({ IDEN_FAQ: id }).fetch();
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
 * Agregar nueva FAQ.
 * @param {string} req.body.NOMB_FAQ - Título de FAQ.
 * @param {string} req.body.DESC_FAQ - Descripción de FAQ.
 * @return {json} FAQ. En caso fallido, mensaje de error.
 */
export const POST = async (req, res) => {
  try {
    const entity = await new Model({
      NOMB_FAQ: req.body.NOMB_FAQ,
      DESC_FAQ: req.body.DESC_FAQ,
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
 * Actualiza una FAQ.
 * @param {integer} req.params.id - ID de FAQ.
 * @param {string} req.body.NOMB_FAQ - Título de FAQ (opcional).
 * @param {string} req.body.DESC_FAQ - Descripción de FAQ (opcional).
 * @return {json} Mensaje de éxito o error.
 */
export const PUT = async (req, res) => {
  try {
    const entity = await new Model({ IDEN_FAQ: req.params.id }).fetch({ require: true });
    await entity.save({
      NOMB_FAQ: (typeof req.body.NOMB_FAQ === 'undefined') ? entity.get('NOMB_FAQ') : req.body.NOMB_FAQ,
      DESC_FAQ: (typeof req.body.DESC_FAQ === 'undefined') ? entity.get('DESC_FAQ') : req.body.DESC_FAQ,
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
 * Elimina una FAQ.
 * @param {integer} req.params.id - ID de FAQ.
 * @return {json} Mensaje de éxito o error.
 */
export const DELETE = async (req, res) => {
  try {
    await new Model({ IDEN_FAQ: req.params.id }).destroy({ require: true });
    res.json({ error: false, data: { message: 'Entity successfully deleted' } });
  } catch (err) {
    if (err instanceof Model.NoRowsDeletedError) {
      res.status(404).json({ error: true, data: { message: 'Entity not found' } });
    } else {
      res.status(500).json({ error: true, data: { message: 'Internal error' } });
    }
  }
};
