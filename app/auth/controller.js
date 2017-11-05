'use strict'
import jwt from 'jsonwebtoken'
import strategie from './jwt-strategie'
var modelUsuario = require('../models/usuario/model')
const authHelpers = require('./_helpers')

/**
 * Autenticar a un usuario.
 * @param {string} req.body.email - Correo electrónico del usuario a autenticar.
 * @param {string} req.body.password - Contraseña del usuario a autenticar.
 * @return {json} Token JWT. En caso fallido, mensaje de error.
 */
var authenticate = function (req, res) {
  if(req.body.email && req.body.password){
    var email = req.body.email
    var password = req.body.password
    new modelUsuario.Usuario({EMAIL_USUARIO: email}).fetch()
      .then(function (usuario) {
        if (usuario) {
          if(authHelpers.comparePass(password, usuario.attributes.DESC_PASSWORD)) {
            var payload = {id: usuario.attributes.IDEN_USUARIO}
            var token = jwt.sign(payload, strategie.jwtOptions.secretOrKey)
            res.json({error: false, data: {token: token}})
          } else {
            res.status(401).json({error: true, data: {message: 'Contraseña incorrecta'}})
          }
        } else {
          res.status(404).json({error: true, data: {message: 'Usuario no encontrado'}})
        }
      }).catch(function (err) {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  } else {
    res.status(401).json({error: true, data: {message: 'email and password are required'}})
  }
}

/* Exports all methods */
module.exports = {
  authenticate,
}
