import cn from '../config'
var passportJWT = require('passport-jwt')
var usuarioModel = require('../models/usuario/model')

/**
 * Definir modalidad de la estrategia a utilizar, junto a la private key.
 */
var jwtOptions = {
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: cn.secret
}

/**
 * Inicializa la estrategia a ejecutarse para cada request dentro de rutas privadas.
 * Validará si el token sigue siendo válido, además validará que el usuario siga existiendo en el sistema.
 */
var strategy = new passportJWT.Strategy(jwtOptions, function(jwt_payload, next) {
  new usuarioModel.Usuario({IDEN_USUARIO: jwt_payload.id}).fetch()
    .then(function (usuario) {
      if (usuario) {
        next(null, usuario)
      } else {
        next(null, false)
      }
    }).catch(function (err) {
      next(null, false)
      throw err
    })
})

module.exports = {
  jwtOptions,
  strategy
}
