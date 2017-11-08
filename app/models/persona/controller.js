'use strict'
var model = require('./model')

/*
**** METODOS HTTP UTILIZADOS ****
* GET:      Consultar y leer recursos
* POST:     Permite crear un nuevo recurso
* PUT:      Permite editar un recurso
* DELETE:   Elimina un recurso
* PATCH:    Permite editar partes concretas de un recurso, recibe los datos mediante x-www-form-urlencode
*
**** PENDIENTE ****
* Implementar PATCH
* Implementar Relaciones
*/

var getPersona = function (req, res) {
  const personaId = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(personaId != 0) {
    new model.Persona({IDEN_PERSONA: personaId}).fetch({withRelated: ['USUARIO']})
      .then(persona => {
        if(!persona) {
          res.status(404).json({error: true, data: {message: 'Persona not found'}})
        } else {
          res.json({error: false, data: persona.toJSON()})
        }
      }).catch(err => {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  } else {
    new model.Personas().fetch({withRelated: ['USUARIO']})
      .then(personas => {
        res.json({error: false, data: personas.toJSON()})
      }).catch(err => {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  }
}

var postPersona = function (req, res) {
  new model.Persona({
    NOMBRES:                req.body.NOMBRES,
    APELLIDO_PATERNO:       req.body.APELLIDO_PATERNO,
    APELLIDO_MATERNO:       req.body.APELLIDO_MATERNO,
    FECH_FECHA_NACIMIENTO:  req.body.FECH_FECHA_NACIMIENTO,
    IDEN_USUARIO:           req.body.IDEN_USUARIO
  }).save()
    .then(persona => {
      res.json({error: false, data: persona.toJSON()})
    }).catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

var putPersona = function (req, res) {
  new model.Persona({IDEN_PERSONA: req.params.id})
    .fetch({require: true})
    .then(persona => {
      persona.save({
        NOMBRES:                req.body.NOMBRES || persona.get('NOMBRES'),
        APELLIDO_PATERNO:       req.body.APELLIDO_PATERNO || persona.get('APELLIDO_PATERNO'),
        APELLIDO_MATERNO:       req.body.APELLIDO_MATERNO || persona.get('APELLIDO_MATERNO'),
        FECH_FECHA_NACIMIENTO:  req.body.FECH_FECHA_NACIMIENTO || persona.get('FECH_FECHA_NACIMIENTO'),
        IDEN_USUARIO:           persona.get('IDEN_USUARIO')
      })
        .then(() => {
          res.json({error: false, data: {message: 'Persona successfully updated'}})
        })
        .catch(err => {
          res.status(500).json({error: true, data: {message: 'Internal error'}})
          throw err
        })
    })
    .catch(model.Persona.NotFoundError, () => {
      res.status(404).json({error: true, data: {message: 'Persona not found'}})
    })
    .catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

var deletePersona = function (req, res) {
  new model.Persona({IDEN_PERSONA: req.params.id})
    .destroy({require: true})
    .then(() => {
      res.json({error: false, data: {message: 'Persona successfully deleted'}})
    })
    .catch(model.Persona.NoRowsDeletedError, () => {
      res.status(404).json({error: true, data: {message: 'Persona not found'}})
    })
    .catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

/* Exports all methods */
module.exports = {
  getPersona,
  postPersona,
  putPersona,
  deletePersona
}
