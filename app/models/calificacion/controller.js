import Checkit from 'checkit';
import { Model, Collection } from './model.js';

/**
 * Obtener calificaciones.
 * @param {integer} req.params.id - ID de calificación (opcional).
 * @return {json} Calificación(es). En caso fallido, mensaje de error.
 */
export const GET = async (req, res) => {
  const id = (typeof req.params.id === 'undefined' || Number.isNaN(req.params.id)) ? 0 : Number.parseInt(req.params.id, 10);
  try {
    if (id !== 0) {
      const entity = await new Model({ IDEN_CALIFICACION: id }).fetch();
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
 * Agregar nueva calificación.
 * @param {integer} req.body.IDEN_PUBLICACION - ID de Publicación a la que corresponde esta calificación.
 * @param {integer} req.body.IDEN_USUARIO - ID de Usuario emisor de esta calificación.
 * @param {integer} req.body.NUMR_VALOR - Calificación en formato numérico.
 * @param {string} req.body.DESC_CALIFICACION - Texto adjunto a calificación (opcional).
 * @param {boolean} req.body.FLAG_BAN - Define si la calificación está baneada (opcional, por defecto false).
 * @param {date} req.body.FECH_CREACION - Fecha de creación de la calificación (opcional, por defecto now()).
 * @return {json} Calificación. En caso fallido, mensaje de error.
 */
export const POST = async (req, res) => {
  try {
    const entity = await new Model({
      IDEN_PUBLICACION: req.body.IDEN_PUBLICACION,
      IDEN_USUARIO: req.body.IDEN_USUARIO,
      NUMR_VALOR: req.body.NUMR_VALOR,
      DESC_CALIFICACION: req.body.DESC_CALIFICACION,
      FLAG_BAN: req.body.FLAG_BAN,
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
 * Actualiza una calificación.
 * @param {integer} req.params.id - ID de la calificación.
 * @param {integer} req.body.IDEN_PUBLICACION - ID de Publicación a la que corresponde esta calificación (opcional).
 * @param {integer} req.body.IDEN_USUARIO - ID de Usuario emisor de esta calificación (opcional).
 * @param {integer} req.body.NUMR_VALOR - Calificación en formato numérico (opcional).
 * @param {string} req.body.DESC_CALIFICACION - Texto adjunto a calificación (opcional).
 * @param {boolean} req.body.FLAG_BAN - Define si la calificación está baneada (opcional).
 * @param {date} req.body.FECH_CREACION - Fecha de creación de la calificación (opcional).
 * @return {json} Mensaje de éxito o error.
 */
export const PUT = async (req, res) => {
  try {
    const entity = await new Model({ IDEN_CALIFICACION: req.params.id }).fetch({ require: true });
    await entity.save({
      IDEN_PUBLICACION: (typeof req.body.IDEN_PUBLICACION === 'undefined') ? entity.get('IDEN_PUBLICACION') : req.body.IDEN_PUBLICACION,
      IDEN_USUARIO: (typeof req.body.IDEN_USUARIO === 'undefined') ? entity.get('IDEN_USUARIO') : req.body.IDEN_USUARIO,
      NUMR_VALOR: (typeof req.body.NUMR_VALOR === 'undefined') ? entity.get('NUMR_VALOR') : req.body.NUMR_VALOR,
      DESC_CALIFICACION: (typeof req.body.DESC_CALIFICACION === 'undefined') ? entity.get('DESC_CALIFICACION') : req.body.DESC_CALIFICACION,
      FLAG_BAN: (typeof req.body.FLAG_BAN === 'undefined') ? entity.get('FLAG_BAN') : req.body.FLAG_BAN,
      FECH_CREACION: (typeof req.body.FECH_CREACION === 'undefined') ? entity.get('FECH_CREACION') : req.body.FECH_CREACION,
    });

    res.json({ error: false, data: { message: 'Entity successfully updated' } });
  } catch (err) {
    if (err instanceof Checkit.Error) {
      res.status(400).json({ error: true, data: err });
    } else if (err instanceof Model.NotFoundError) {
      res.status(404).json({ error: true, data: { message: 'Entity not found' } });
    } else {
      res.status(500).json({ error: true, data: err });
    }
  }
};

/**
 * Elimina una calificación.
 * @param {integer} req.params.id - ID de la calificación.
 * @return {json} Mensaje de éxito o error.
 */
export const DELETE = async (req, res) => {
  try {
    await new Model({ IDEN_CALIFICACION: req.params.id }).destroy({ require: true });
    res.json({ error: false, data: { message: 'Entity successfully deleted' } });
  } catch (err) {
    if (err instanceof Model.NoRowsDeletedError) {
      res.status(404).json({ error: true, data: { message: 'Entity not found' } });
    } else {
      res.status(500).json({ error: true, data: { message: 'Internal error' } });
    }
  }
};
