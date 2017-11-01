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
* Implementar PUT
* Relaciones (?)
*/

var getUsuario = function (req, res) {
  const usuarioId = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(usuarioId != 0) {
	  new model.Usuario({IDEN_USUARIO: usuarioId}).fetch({withRelated: ['telefonos']})
		.then(function (usuario) {
		if(!usuario) {
            res.status(404).json({error: true, data: {message: 'Usuario not found'}})
        } else {
            res.json({error: false, data: usuario.toJSON()})
        }
		}).catch(function (err) {
			console.log(err)
			res.status(500).json({error: true, data: {message: err.message}})
    })
  } else {
		new model.Usuarios().fetch({withRelated: ['telefonos']})
		.then(function (usuarios) {
			res.json({error: false, data: usuarios.toJSON()})
		}).catch(function (err) {
			console.log(err)
			res.status(500).json({error: true, data: {message: err.message}})
		})
  }
}

var postUsuario = function (req, res) {
	new model.Usuario({
		IDEN_ROL:       req.body.IDEN_ROL,
		RUT_USUARIO:    req.body.RUT_USUARIO,
    DV_USUARIO:     req.body.DV_USUARIO,
    EMAIL_USUARIO:  req.body.EMAIL_USUARIO,
    DESC_PASSWORD:  req.body.DESC_PASSWORD,
    FLAG_VIGENTE:   req.body.FLAG_VIGENTE
	}).save()
		.then(function (usuario) {
			res.json({error: false, data: usuario.toJSON()})
		}).catch(function (err) {
			console.log(err)
			res.status(500).json({error: true, data: {message: err.message}})
		})
}

/* var putUsuario = function (req, res) {
	new model.Usuario({IDEN_USUARIO: req.params.id})
	.fetch({require: true})
	.then(function (usuario) {
		usuario.save({
			CODI_ROL:	(typeof req.body.CODI_ROL === 'undefined') ? rol.get('CODI_ROL') : req.body.CODI_ROL,
			NOMB_ROL:	(typeof req.body.NOMB_ROL === 'undefined') ? rol.get('NOMB_ROL') : req.body.NOMB_ROL,
			DESC_ROL:	(typeof req.body.DESC_ROL === 'undefined') ? rol.get('DESC_ROL') : req.body.DESC_ROL,
		})
		.then(function () {
			res.json({error: false, data: {message: 'Rol successfully updated'}})
		})
		.catch(function (err) {
			res.status(500).json({error: true, data: {message: err.message}})
		})
    })
    .catch(model.Rol.NotFoundError, function (err) {
        res.status(404).json({error: true, data: {message: 'Rol not found'}})
    })
	.catch(function (err) {
		res.status(500).json({error: true, data: {message: err.message}})
	})
} */

var deleteUsuario = function (req, res) {
	new model.Usuario({IDEN_USUARIO: req.params.id})
	.destroy({require: true})
	.then(function () {
		res.json({error: false, data: {message: 'Usuario successfully deleted'}})
	})
	.catch(model.Usuario.NoRowsDeletedError, function() {
		res.status(404).json({error: true, data: {message: 'Usuario not found'}})
	})
	.catch(function (err) {
		res.status(500).json({error: true, data: {message: err.message}})
	})
}

/* Exports all methods */
module.exports = {
  getUsuario,
	postUsuario,
	// putUsuario,
	deleteUsuario
}
