import Checkit from 'checkit';
import { Model, Collection } from './model.js';
import { filter } from './_helpers.js';

/**
 * Obtener categorías.
 * @param {integer} req.params.id - ID de categoría (opcional).
 * @return {json} Categoría(s). En caso fallido, mensaje de error.
 */
export const GET = async (req, res) => {
  const id = (typeof req.params.id === 'undefined' || Number.isNaN(req.params.id)) ? 0 : Number.parseInt(req.params.id, 10);
  try {
    if (id !== 0) {
      const entity = await new Model({ IDEN_CATEGORIA: id }).fetch({ withRelated: ['subcategorias'] });
      if (!entity) {
        res.status(404).json({ error: true, data: { message: 'Entity not found' } });
      } else {
        res.json({ error: false, data: filter.GETsingle(entity) });
      }
    } else {
      const entities = await new Collection().query((query) => {
        query
          .where('IDEN_CATEGORIA_PADRE', null)
          .orderBy('IDEN_CATEGORIA', 'asc');
      })
        .fetch({ withRelated: ['subcategorias'] });

      res.json({ error: false, data: filter.GETall(entities) });
    }
  } catch (err) {
    res.status(500).json({ error: true, data: { message: 'Internal error' } });
  }
};

/**
 * Agregar nueva categoría.
 * @param {string} req.body.NOMB_CATEGORIA - Nombre de la categoría.
 * @param {integer} req.body.IDEN_CATEGORIA_PADRE - ID de Categoría padre (opcional).
 * @param {boolean} req.body.FLAG_VIGENTE - Define si la categoría está activa (opcional).
 * @return {json} Categoría. En caso fallido, mensaje de error.
 */
export const POST = async (req, res) => {
  try {
    const entity = await new Model({
      NOMB_CATEGORIA: req.body.NOMB_CATEGORIA,
      IDEN_CATEGORIA_PADRE: req.body.IDEN_CATEGORIA_PADRE,
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
 * Actualiza una categoría.
 * @param {integer} req.params.id - ID de la categoría.
 * @param {string} req.body.NOMB_CATEGORIA - Nombre de la categoría (opcional).
 * @param {integer} req.body.IDEN_CATEGORIA_PADRE - ID de Categoría padre (opcional).
 * @param {boolean} req.body.FLAG_VIGENTE - Define si la categoría está activa (opcional).
 * @return {json} Mensaje de éxito o error.
 */
export const PUT = async (req, res) => {
  try {
    const entity = await new Model({ IDEN_CATEGORIA: req.params.id })
      .fetch({ require: true });

    await entity.save({
      NOMB_CATEGORIA: (typeof req.body.NOMB_CATEGORIA === 'undefined') ? entity.get('NOMB_CATEGORIA') : req.body.NOMB_CATEGORIA,
      IDEN_CATEGORIA_PADRE: (typeof req.body.IDEN_CATEGORIA_PADRE === 'undefined') ? entity.get('IDEN_CATEGORIA_PADRE') : req.body.IDEN_CATEGORIA_PADRE,
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
 * Elimina una categoría.
 * @param {integer} req.params.id - ID de la categoría.
 * @return {json} Mensaje de éxito o error.
 */
export const DELETE = async (req, res) => {
  try {
    await new Model({ IDEN_CATEGORIA: req.params.id }).destroy({ require: true });
    res.json({ error: false, data: { message: 'Entity successfully deleted' } });
  } catch (err) {
    if (err instanceof Model.NoRowsDeletedError) {
      res.status(404).json({ error: true, data: { message: 'Entity not found' } });
    } else {
      res.status(500).json({ error: true, data: { message: 'Internal error' } });
    }
  }
};
