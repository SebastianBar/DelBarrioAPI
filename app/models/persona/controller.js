import Checkit from 'checkit';
import { Model, Collection } from './model.js';

/**
 * Obtener personas.
 * @param {integer} req.params.id - ID de persona (opcional).
 * @return {json} Persona(s). En caso fallido, mensaje de error.
 */
export const GET = async (req, res) => {
  const id = (typeof req.params.id === 'undefined' || Number.isNaN(req.params.id)) ? 0 : Number.parseInt(req.params.id, 10);
  try {
    if (id !== 0) {
      const entity = await new Model({ IDEN_PERSONA: id }).fetch({ withRelated: ['usuario'] });
      if (!entity) {
        res.status(404).json({ error: true, data: { message: 'Entity not found' } });
      } else {
        res.json({ error: false, data: entity.toJSON() });
      }
    } else {
      const entities = await new Collection().fetch({ withRelated: ['usuario'] });
      res.json({ error: false, data: entities.toJSON() });
    }
  } catch (err) {
    res.status(500).json({ error: true, data: { message: 'Internal error' } });
  }
};

/**
 * Agregar nueva persona.
 * @param {integer} req.body.IDEN_USUARIO - ID de Usuario al que corresponde esta persona.
 * @param {string} req.body.NOMBRES - Nombres de la persona.
 * @param {string} req.body.APELLIDO_PATERNO - Apellido paterno de la persona.
 * @param {string} req.body.APELLIDO_MATERNO - Apellido materno de la persona.
 * @param {date} req.body.FECH_FECHA_NACIMIENTO - Fecha de nacimiento de la persona.
 * @return {json} Persona. En caso fallido, mensaje de error.
 */
export const POST = async (req, res) => {
  try {
    const entity = await new Model({
      IDEN_USUARIO: req.body.IDEN_USUARIO,
      NOMBRES: req.body.NOMBRES,
      APELLIDO_PATERNO: req.body.APELLIDO_PATERNO,
      APELLIDO_MATERNO: req.body.APELLIDO_MATERNO,
      FECH_FECHA_NACIMIENTO: req.body.FECH_FECHA_NACIMIENTO,
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
 * Actualiza una persona.
 * @param {integer} req.params.id - ID de la persona.
 * @param {integer} req.body.IDEN_USUARIO - ID de Usuario al que corresponde esta persona (opcional).
 * @param {string} req.body.NOMBRES - Nombres de la persona (opcional).
 * @param {string} req.body.APELLIDO_PATERNO - Apellido paterno de la persona (opcional).
 * @param {string} req.body.APELLIDO_MATERNO - Apellido materno de la persona (opcional).
 * @param {date} req.body.FECH_FECHA_NACIMIENTO - Fecha de nacimiento de la persona (opcional).
 * @return {json} Mensaje de éxito o error.
 */
export const PUT = async (req, res) => {
  try {
    const entity = await new Model({ IDEN_PERSONA: req.params.id }).fetch({ require: true });
    await entity.save({
      IDEN_USUARIO: (typeof req.body.IDEN_USUARIO === 'undefined') ? entity.get('IDEN_USUARIO') : req.body.IDEN_USUARIO,
      NOMBRES: (typeof req.body.NOMBRES === 'undefined') ? entity.get('NOMBRES') : req.body.NOMBRES,
      APELLIDO_PATERNO: (typeof req.body.APELLIDO_PATERNO === 'undefined') ? entity.get('APELLIDO_PATERNO') : req.body.APELLIDO_PATERNO,
      APELLIDO_MATERNO: (typeof req.body.APELLIDO_MATERNO === 'undefined') ? entity.get('APELLIDO_MATERNO') : req.body.APELLIDO_MATERNO,
      FECH_FECHA_NACIMIENTO: (typeof req.body.FECH_FECHA_NACIMIENTO === 'undefined') ? entity.get('FECH_FECHA_NACIMIENTO') : req.body.FECH_FECHA_NACIMIENTO,
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
 * Elimina una persona.
 * @param {integer} req.params.id - ID de la persona.
 * @return {json} Mensaje de éxito o error.
 */
export const DELETE = async (req, res) => {
  try {
    await new Model({ IDEN_PERSONA: req.params.id }).destroy({ require: true });
    res.json({ error: false, data: { message: 'Entity successfully deleted' } });
  } catch (err) {
    if (err instanceof Model.NoRowsDeletedError) {
      res.status(404).json({ error: true, data: { message: 'Entity not found' } });
    } else {
      res.status(500).json({ error: true, data: { message: 'Internal error' } });
    }
  }
};
