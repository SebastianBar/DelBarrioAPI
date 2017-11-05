'use strict'
var model = require('./model')

/*
**** METODOS HTTP UTILIZADOS ****
* GET:      Consultar y leer recursos
*/

var getPermiso = function (req, res) {
  const permisoId = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(permisoId != 0) {
    new model.Permiso({IDEN_PERMISO: permisoId}).fetch({withRelated: ['roles']})
      .then(permiso => {
        if(!permiso) {
          res.status(404).json({error: true, data: {message: 'Permiso not found'}})
        } else {
          res.json({error: false, data: permiso.toJSON()})
        }
      }).catch(err => {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  } else {
    new model.Permisos().fetch({withRelated: ['roles']})
      .then(permisos => {
        res.json({error: false, data: permisos.toJSON()})
      }).catch(err => {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  }
}

/* Exports all methods */
module.exports = {
  getPermiso
}
