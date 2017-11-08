import cn from '../config'
import passportJWT from 'passport-jwt'
import { Model } from '../models/usuario/model'

/**
 * Definir modalidad de la estrategia a utilizar, junto a la private key.
 */
const jwtOptions = {
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: cn.secret
}

/**
 * Inicializa la estrategia a ejecutarse para cada request dentro de rutas privadas.
 * Validará si el token sigue siendo válido, además validará que el usuario siga existiendo en el sistema.
 */
const strategy = new passportJWT.Strategy(jwtOptions, ((jwt_payload, next) => {
  new Model({IDEN_USUARIO: jwt_payload.id}).fetch()
    .then(user => {
      if (user && user.attributes.FLAG_VIGENTE) {
        next(null, user)
      } else {
        next(null, false)
      }
    }).catch(err => {
      next(null, false)
      throw err
    })
}))

/* Se exportan las constantes */
module.exports = {
  jwtOptions,
  strategy
}
