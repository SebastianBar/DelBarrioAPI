import cn from '../config'
import passport from 'passport'
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
  console.log('Payload received: ', jwt_payload)

  new usuarioModel.Usuario({IDEN_USUARIO: jwt_payload.id}).fetch()
  .then(function (usuario) {
    if (usuario) {
      next(null, usuario)
    } else {
      next(null, false)
    }
  }).catch(function (err) {
    console.log(err)
    next(null, false)
  })
})

module.exports = {
  jwtOptions,
  strategy
}
