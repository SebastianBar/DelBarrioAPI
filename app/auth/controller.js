import jwt from 'jsonwebtoken'
import strategie from './jwt-strategie'
import authHelpers from './_helpers'
import { Model } from '../models/usuario/model'

/**
 * Autenticar a un usuario.
 * @param {string} req.body.email - Correo electrónico del usuario a autenticar.
 * @param {string} req.body.password - Contraseña del usuario a autenticar.
 * @return {json} Token JWT. En caso fallido, mensaje de error.
 */
function authenticate (req, res) {
  if(req.body.email && req.body.password){
    var email = req.body.email
    var password = req.body.password
    new Model({EMAIL_USUARIO: email}).fetch()
      .then(user => {
        if (user) {
          if(user.attributes.FLAG_VIGENTE) {
            if(authHelpers.comparePass(password, user.attributes.DESC_PASSWORD)) {
              var payload = {id: user.attributes.IDEN_USUARIO}
              var token = jwt.sign(payload, strategie.jwtOptions.secretOrKey)
              res.json({error: false, data: {token: token}})
            } else {
              res.status(401).json({error: true, data: {message: 'Contraseña incorrecta'}})
            }
          } else {
            res.status(401).json({error: true, data: {message: 'Cuenta deshabilitada'}})
          }
        } else {
          res.status(404).json({error: true, data: {message: 'Usuario no encontrado'}})
        }
      }).catch(err => {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  } else {
    res.status(401).json({error: true, data: {message: 'email and password are required'}})
  }
}

function getUsuario (req, res) {
  res.json({error: false, data: req.user.toJSON()})
}

/* Se exporta el método */
module.exports = {
  authenticate,
  getUsuario
}
