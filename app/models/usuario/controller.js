import Checkit from 'checkit';
import { Model, Collection } from './model.js';

/**
 * Obtener usuarios.
 * @param {integer} req.params.id - ID de usuario (opcional).
 * @return {json} Usuario(s). En caso fallido, mensaje de error.
 */
export const GET = async (req, res) => {
  const id = (typeof req.params.id === 'undefined' || Number.isNaN(req.params.id)) ? 0 : Number.parseInt(req.params.id, 10);
  try {
    if (id !== 0) {
      const entity = await new Model({ IDEN_USUARIO: id }).fetch({ withRelated: ['telefonos'] });
      if (!entity) {
        res.status(404).json({ error: true, data: { message: 'Entity not found' } });
      } else {
        res.json({ error: false, data: entity.toJSON() });
      }
    } else {
      const entities = await new Collection().fetch({ withRelated: ['telefonos'] });
      res.json({ error: false, data: entities.toJSON() });
    }
  } catch (err) {
    res.status(500).json({ error: true, data: { message: 'Internal error' } });
  }
};

/**
 * Agregar nuevo usuario.
 * @param {integer} req.body.IDEN_ROL - ID de Rol del usuario.
 * @param {string} req.body.EMAIL_USUARIO - Correo electrónico del usuario.
 * @param {string} req.body.DESC_PASSWORD - Contraseña del usuario (en texto plano).
 * @param {boolean} req.body.FLAG_VIGENTE - Define si el usuario está activo (opcional, por defecto true).
 * @param {boolean} req.body.FLAG_BAN - Define si el usuario está baneado (opcional, por defecto false).
 * @return {json} Usuario. En caso fallido, mensaje de error.
 */
export const POST = async (req, res) => {
  try {
    const entity = await new Model({
      IDEN_ROL: req.body.IDEN_ROL,
      EMAIL_USUARIO: req.body.EMAIL_USUARIO,
      DESC_PASSWORD: req.body.DESC_PASSWORD,
      FLAG_VIGENTE: req.body.FLAG_VIGENTE,
      FLAG_BAN: req.body.FLAG_BAN,
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
 * Actualiza un usuario.
 * @param {integer} req.params.id - ID del usuario.
 * @param {string} req.body.EMAIL_USUARIO - Correo electrónico del usuario (opcional).
 * @param {string} req.body.DESC_PASSWORD - Contraseña del usuario (opcional, en texto plano).
 * @param {boolean} req.body.FLAG_VIGENTE - Define si el usuario está activo (opcional).
 * @param {boolean} req.body.FLAG_BAN - Define si el usuario está baneado (opcional).
 * @return {json} Mensaje de éxito o error.
 */
export const PUT = async (req, res) => {
  try {
    const entity = await new Model({ IDEN_USUARIO: req.params.id }).fetch({ require: true });
    await entity.save({
      EMAIL_USUARIO: (typeof req.body.EMAIL_USUARIO === 'undefined') ? entity.get('EMAIL_USUARIO') : req.body.EMAIL_USUARIO,
      DESC_PASSWORD: (typeof req.body.DESC_PASSWORD === 'undefined') ? entity.get('DESC_PASSWORD') : req.body.DESC_PASSWORD,
      FLAG_VIGENTE: (typeof req.body.FLAG_VIGENTE === 'undefined') ? entity.get('FLAG_VIGENTE') : req.body.FLAG_VIGENTE,
      FLAG_BAN: (typeof req.body.FLAG_BAN === 'undefined') ? entity.get('FLAG_BAN') : req.body.FLAG_BAN,
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
 * Elimina un usuario.
 * @param {integer} req.params.id - ID del usuario.
 * @return {json} Mensaje de éxito o error.
 */
export const DELETE = async (req, res) => {
  try {
    await new Model({ IDEN_USUARIO: req.params.id }).destroy({ require: true });
    res.json({ error: false, data: { message: 'Entity successfully deleted' } });
  } catch (err) {
    if (err instanceof Model.NoRowsDeletedError) {
      res.status(404).json({ error: true, data: { message: 'Entity not found' } });
    } else {
      res.status(500).json({ error: true, data: { message: 'Internal error' } });
    }
  }
};
