import jwt from 'jsonwebtoken';
import { jwtOptions } from '../middlewares/jwt-strategie.js';
import { comparePass, filter } from './_helpers.js';
import { Model } from '../models/usuario/model.js';

/**
 * Autenticar a un usuario.
 * @param {string} req.body.email - Correo electrónico del usuario a autenticar.
 * @param {string} req.body.password - Contraseña del usuario a autenticar.
 * @return {json} Token JWT. En caso fallido, mensaje de error.
 */
export const authenticate = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(401).json({ error: true, data: { message: 'email and password are required' } });
    return;
  }

  const { email } = req.body;
  const { password } = req.body;

  try {
    const user = await new Model({ EMAIL_USUARIO: email }).fetch({ withRelated: ['rol', 'rol.permisos', 'persona', 'emprendedor'] });
    if (user) {
      if (comparePass(password, user.attributes.DESC_PASSWORD)) {
        if (user.attributes.FLAG_VIGENTE) {
          if (!user.attributes.FLAG_BAN) {
            const payload = filter.tokenPayload(user.toJSON({ omitPivot: true }));
            const token = jwt.sign(payload, jwtOptions.secretOrKey);
            res.json({ error: false, data: { token } });
          } else {
            res.status(401).json({ error: true, data: { message: 'Cuenta baneada' } });
          }
        } else {
          res.status(401).json({ error: true, data: { message: 'Cuenta deshabilitada' } });
        }
      } else {
        res.status(401).json({ error: true, data: { message: 'Contraseña incorrecta' } });
      }
    } else {
      res.status(404).json({ error: true, data: { message: 'Usuario no encontrado' } });
    }
  } catch (err) {
    res.status(500).json({ error: true, data: { message: 'Internal error' } });
  }
};

export const getUsuario = async (req, res) => {
  try {
    const user = await new Model({ IDEN_USUARIO: req.user.IDEN_USUARIO }).fetch({ withRelated: ['rol', 'telefonos', 'persona', 'emprendedor'] });
    res.json({ error: false, data: filter.getUsuario(user.toJSON()) });
  } catch (err) {
    res.status(500).json({ error: true, data: { message: 'Internal error' } });
  }
};
