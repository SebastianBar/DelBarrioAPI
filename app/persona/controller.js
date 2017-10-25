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

var getPersona = function (req, res) {
  const personaId = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(personaId != 0) {
	  new model.Persona({PER_Id: personaId}).fetch()
		.then(function (persona) {
		if(!persona) {
            res.status(404).json({error: true, data: {message: 'Persona not found'}})
        } else {
            res.json({error: false, data: persona.toJSON()})
        }
		}).catch(function (err) {
			console.log(err)
			res.status(500).json({error: true, data: {message: err.message}})
    })
  } else {
		new model.Personas().fetch()
		.then(function (personas) {
			res.json({error: false, data: personas.toJSON()})
		}).catch(function (err) {
			console.log(err)
			res.status(500).json({error: true, data: {message: err.message}})
		})
  }
}

var postPersona = function (req, res) {
	new model.Persona({
		PER_Rut: req.body.PER_Rut,
		PER_Dv: req.body.PER_Dv,
		PER_Nombre: req.body.PER_Nombre,
		PER_ApePat: req.body.PER_ApePat,
    PER_ApeMat: req.body.PER_ApeMat,
    PER_Estado: req.body.PER_Estado
	}).save()
		.then(function (persona) {
			res.json({error: false, data: persona.toJSON()})
		}).catch(function (err) {
			console.log(err)
			res.status(500).json({error: true, data: {message: err.message}})
		})
}

var putPersona = function (req, res) {
	new model.Persona({PER_Id: req.params.id})
	.fetch({require: true})
	.then(function (persona) {
		persona.save({
			PER_Rut:		(typeof req.body.estado === 'undefined') ? persona.get('PER_Rut') : req.body.PER_Rut,
			PER_Dv:			(typeof req.body.estado === 'undefined') ? persona.get('PER_Dv') : req.body.PER_Dv,
			PER_Nombre:	(typeof req.body.estado === 'undefined') ? persona.get('PER_Nombre') : req.body.PER_Nombre,
			PER_ApePat:	(typeof req.body.estado === 'undefined') ? persona.get('PER_ApePat') : req.body.PER_ApePat,
			PER_ApeMat:	(typeof req.body.estado === 'undefined') ? persona.get('PER_ApeMat') : req.body.PER_ApeMat,
			PER_Estado:	(typeof req.body.estado === 'undefined') ? persona.get('PER_Estado') : req.body.PER_Estado
		})
		.then(function () {
			res.json({error: false, data: {message: 'Persona successfully updated'}})
		})
		.catch(function (err) {
			res.status(500).json({error: true, data: {message: err.message}})
		})
    })
    .catch(model.Persona.NotFoundError, function (err) {
        res.status(404).json({error: true, data: {message: 'Persona not found'}})
    })
	.catch(function (err) {
		res.status(500).json({error: true, data: {message: err.message}})
	})
}

var deletePersona = function (req, res) {
	new model.Persona({PER_Id: req.params.id})
	.destroy({require: true})
	.then(function () {
		res.json({error: false, data: {message: 'Persona successfully deleted'}})
	})
	.catch(model.Persona.NoRowsDeletedError, function() {
		res.status(404).json({error: true, data: {message: 'Persona not found'}})
	})
	.catch(function (err) {
		res.status(500).json({error: true, data: {message: err.message}})
	})
}

/* Exports all methods */
module.exports = {
  getPersona,
	postPersona,
	putPersona,
	deletePersona
}
