'use strict'
var model = require('./model')

/*
**** METODOS HTTP UTILIZADOS ****
* GET:      Consultar y leer recursos
*/

var getPermiso = function (req, res) {
  const permisoId = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(permisoId != 0) {
	  new model.Permiso({IDEN_PERMISO: permisoId}).fetch()
		.then(function (permiso) {
		if(!permiso) {
            res.status(404).json({error: true, data: {message: 'Permiso not found'}})
        } else {
            res.json({error: false, data: permiso.toJSON()})
        }
		}).catch(function (err) {
			console.log(err)
			res.status(500).json({error: true, data: {message: err.message}})
    })
  } else {
		new model.Permisos().fetch()
		.then(function (permisos) {
			res.json({error: false, data: permisos.toJSON()})
		}).catch(function (err) {
			console.log(err)
			res.status(500).json({error: true, data: {message: err.message}})
		})
  }
}

/* Exports all methods */
module.exports = {
  getPermiso
}
