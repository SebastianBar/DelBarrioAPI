'use strict'
var model = require('./model')

/*
**** METODOS HTTP UTILIZADOS ****
* GET:      Obtener recursos
* POST:     Crear un nuevo recurso
* PUT:      Editar un recurso
* DELETE:   Elimina un recurso
*/

var getRol = function (req, res) {
  const rolId = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(rolId != 0) {
    new model.Rol({IDEN_ROL: rolId}).fetch({withRelated: ['permisos']})
      .then(rol => {
        if(!rol) {
          res.status(404).json({error: true, data: {message: 'Rol not found'}})
        } else {
          res.json({error: false, data: rol.toJSON()})
        }
      }).catch(err => {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  } else {
    new model.Roles().fetch({withRelated: ['permisos']})
      .then(roles => {
        res.json({error: false, data: roles.toJSON()})
      }).catch(err => {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  }
}

var postRol = function (req, res) {
  new model.Rol({
    CODI_ROL: req.body.CODI_ROL,
    NOMB_ROL: req.body.NOMB_ROL
  }).save()
    .then(rol => {
      res.json({error: false, data: rol.toJSON()})
    }).catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

var putRol = function (req, res) {
  new model.Rol({IDEN_ROL: req.params.id})
    .fetch({require: true})
    .then(rol => {
      rol.save({
        CODI_ROL:	req.body.CODI_ROL || rol.get('CODI_ROL'),
        NOMB_ROL:	req.body.NOMB_ROL || rol.get('NOMB_ROL')
      })
        .then(() => {
          res.json({error: false, data: {message: 'Rol successfully updated'}})
        })
        .catch(err => {
          res.status(500).json({error: true, data: {message: 'Internal error'}})
          throw err
        })
    })
    .catch(model.Rol.NotFoundError, () => {
      res.status(404).json({error: true, data: {message: 'Rol not found'}})
    })
    .catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

var deleteRol = function (req, res) {
  new model.Rol({IDEN_ROL: req.params.id})
    .destroy({require: true})
    .then(() => {
      res.json({error: false, data: {message: 'Rol successfully deleted'}})
    })
    .catch(model.Rol.NoRowsDeletedError, () => {
      res.status(404).json({error: true, data: {message: 'Rol not found'}})
    })
    .catch(err => {
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
