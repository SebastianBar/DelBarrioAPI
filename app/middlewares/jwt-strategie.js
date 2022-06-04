import passportJWT from 'passport-jwt';
import cn from '../config.js';
import { Model } from '../models/usuario/model.js';

/**
 * Definir modalidad de la estrategia a utilizar, junto a la private key.
 */
export const jwtOptions = {
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: cn.secret,
};

/**
 * Inicializa la estrategia a ejecutarse para cada request dentro de rutas privadas.
 * Validará si el token sigue siendo válido, además validará que el usuario siga existiendo en el sistema.
 */
export const strategy = new passportJWT.Strategy(jwtOptions, (async (jwtPayload, next) => {
  try {
    const user = await new Model({ IDEN_USUARIO: jwtPayload.id }).fetch({ columns: ['IDEN_USUARIO', 'IDEN_ROL', 'EMAIL_USUARIO', 'FLAG_VIGENTE', 'FLAG_BAN'], withRelated: ['rol', 'rol.permisos'] });
    if (user && user.attributes.FLAG_VIGENTE && !user.attributes.FLAG_BAN) {
      next(null, user.toJSON());
    } else {
      next(null, false);
    }
  } catch (error) {
    next(null, false);
  }
}));
