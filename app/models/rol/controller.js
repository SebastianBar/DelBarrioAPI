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
* Implementar PATCH?
*/

var getRol = function (req, res) {
  const rolId = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(rolId != 0) {
    new model.Rol({IDEN_ROL: rolId}).fetch({withRelated: ['permisos']})
      .then(function (rol) {
        if(!rol) {
          res.status(404).json({error: true, data: {message: 'Rol not found'}})
        } else {
          res.json({error: false, data: rol.toJSON()})
        }
      }).catch(function (err) {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  } else {
    new model.Roles().fetch({withRelated: ['permisos']})
      .then(function (roles) {
        res.json({error: false, data: roles.toJSON()})
      }).catch(function (err) {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  }
}

var postRol = function (req, res) {
  new model.Rol({
    CODI_ROL: req.body.CODI_ROL,
    NOMB_ROL: req.body.NOMB_ROL,
    DESC_ROL: req.body.DESC_ROL
  }).save()
    .then(function (rol) {
      res.json({error: false, data: rol.toJSON()})
    }).catch(function (err) {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

var putRol = function (req, res) {
  new model.Rol({IDEN_ROL: req.params.id})
    .fetch({require: true})
    .then(function (rol) {
      rol.save({
        CODI_ROL:	req.body.CODI_ROL || rol.get('CODI_ROL'),
        NOMB_ROL:	req.body.NOMB_ROL || rol.get('NOMB_ROL'),
        DESC_ROL:	req.body.DESC_ROL || rol.get('DESC_ROL'),
      })
        .then(function () {
          res.json({error: false, data: {message: 'Rol successfully updated'}})
        })
        .catch(function (err) {
          res.status(500).json({error: true, data: {message: 'Internal error'}})
          throw err
        })
    })
    .catch(model.Rol.NotFoundError, function () {
      res.status(404).json({error: true, data: {message: 'Rol not found'}})
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

var deleteRol = function (req, res) {
  new model.Rol({IDEN_ROL: req.params.id})
    .destroy({require: true})
    .then(function () {
      res.json({error: false, data: {message: 'Rol successfully deleted'}})
    })
    .catch(model.Rol.NoRowsDeletedError, function() {
      res.status(404).json({error: true, data: {message: 'Rol not found'}})
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

/* Exports all methods */
module.exports = {
  getRol,
  postRol,
  putRol,
  deleteRol
}
