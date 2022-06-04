import Checkit from 'checkit';
import { Model, Collection } from './model.js';

/**
 * Obtener resoluciones de denuncia.
 * @param {integer} req.params.id - ID de resolución de denuncia (opcional).
 * @return {json} Resolución(es) de denuncia. En caso fallido, mensaje de error.
 */
export const GET = async (req, res) => {
  const id = (typeof req.params.id === 'undefined' || Number.isNaN(req.params.id)) ? 0 : Number.parseInt(req.params.id, 10);
  try {
    if (id !== 0) {
      const entity = await new Model({ IDEN_RESOLUCION_DENUNCIA: id }).fetch();
      if (!entity) {
        res.status(404).json({ error: true, data: { message: 'Entity not found' } });
      } else {
        res.json({ error: false, data: entity.toJSON() });
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
 * Agregar nueva resolución de denuncia.
 * @param {integer} req.body.IDEN_DENUNCIA - ID de denuncia.
 * @param {integer} req.body.IDEN_USUARIO - ID de usuario emisor.
 * @param {string} req.body.DESC_RESOLUCION - Texto descriptivo de la resolución de denuncia.
 * @param {datetime} req.body.FECH_CREACION - Fecha de creación de la denuncia (opcional, por defecto now()).
 * @return {json} Denuncia. En caso fallido, mensaje de error.
 */
export const POST = async (req, res) => {
  try {
    const entity = await new Model({
      IDEN_DENUNCIA: req.body.IDEN_DENUNCIA,
      IDEN_USUARIO: req.body.IDEN_USUARIO,
      DESC_RESOLUCION: req.body.DESC_RESOLUCION,
      FECH_CREACION: req.body.FECH_CREACION,
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
 * Actualiza una resolución de denuncia.
 * @param {integer} req.params.id - ID de resolución de denuncia.
 * @param {integer} req.body.IDEN_DENUNCIA - ID de denuncia (opcional).
 * @param {integer} req.body.IDEN_USUARIO - ID de usuario emisor (opcional).
 * @param {string} req.body.DESC_RESOLUCION - Texto descriptivo de la resolución de denuncia (opcional).
 * @param {datetime} req.body.FECH_CREACION - Fecha de creación de la denuncia (opcional).
 * @return {json} Mensaje de éxito o error.
 */
export const PUT = async (req, res) => {
  try {
    const entity = await new Model({ IDEN_RESOLUCION_DENUNCIA: req.params.id }).fetch({ require: true });
    await entity.save({
      IDEN_DENUNCIA: (typeof req.body.IDEN_DENUNCIA === 'undefined') ? entity.get('IDEN_DENUNCIA') : req.body.IDEN_DENUNCIA,
      IDEN_USUARIO: (typeof req.body.IDEN_USUARIO === 'undefined') ? entity.get('IDEN_USUARIO') : req.body.IDEN_USUARIO,
      DESC_RESOLUCION: (typeof req.body.DESC_RESOLUCION === 'undefined') ? entity.get('DESC_RESOLUCION') : req.body.DESC_RESOLUCION,
      FECH_CREACION: (typeof req.body.FECH_CREACION === 'undefined') ? entity.get('FECH_CREACION') : req.body.FECH_CREACION,
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
 * Elimina una resolución de denuncia.
 * @param {integer} req.params.id - ID de resolución de denuncia.
 * @return {json} Mensaje de éxito o error.
 */
export const DELETE = async (req, res) => {
  try {
    await new Model({ IDEN_RESOLUCION_DENUNCIA: req.params.id }).destroy({ require: true });
    res.json({ error: false, data: { message: 'Entity successfully deleted' } });
  } catch (err) {
    if (err instanceof Model.NoRowsDeletedError) {
      res.status(404).json({ error: true, data: { message: 'Entity not found' } });
    } else {
      res.status(500).json({ error: true, data: { message: 'Internal error' } });
    }
  }
};
