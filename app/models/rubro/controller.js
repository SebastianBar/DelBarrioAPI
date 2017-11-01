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

var getRubro = function (req, res) {
  const rubroId = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(rubroId != 0) {
	  new model.Rubro({IDEN_RUBRO: rubroId}).fetch({withRelated: ['emprendedores']})
		.then(function (rubro) {
		if(!rubro) {
            res.status(404).json({error: true, data: {message: 'Rubro not found'}})
        } else {
            res.json({error: false, data: rubro.toJSON()})
        }
		}).catch(function (err) {
			console.log(err)
			res.status(500).json({error: true, data: {message: err.message}})
    })
  } else {
		new model.Rubros().fetch({withRelated: ['emprendedores']})
		.then(function (rubros) {
			res.json({error: false, data: rubros.toJSON()})
		}).catch(function (err) {
			console.log(err)
			res.status(500).json({error: true, data: {message: err.message}})
		})
  }
}

var postRubro = function (req, res) {
	new model.Rubro({
		FLAG_CONTENIDO_ADULTO: req.body.FLAG_CONTENIDO_ADULTO,
		NOMB_RUBRO: req.body.NOMB_RUBRO,
		DESC_RUBRO: req.body.DESC_RUBRO
	}).save()
		.then(function (rubro) {
			res.json({error: false, data: rubro.toJSON()})
		}).catch(function (err) {
			console.log(err)
			res.status(500).json({error: true, data: {message: err.message}})
		})
}

var putRubro = function (req, res) {
	new model.Rubro({IDEN_RUBRO: req.params.id})
	.fetch({require: true})
	.then(function (rubro) {
		rubro.save({
			CODI_RUBRO:	req.body.CODI_RUBRO || rubro.get('CODI_RUBRO'),
			NOMB_RUBRO:	req.body.NOMB_RUBRO || rubro.get('NOMB_RUBRO'),
			FLAG_CONTENIDO_ADULTO:	req.body.FLAG_CONTENIDO_ADULTO || rubro.get('FLAG_CONTENIDO_ADULTO'),
		})
		.then(function () {
			res.json({error: false, data: {message: 'Rubro successfully updated'}})
		})
		.catch(function (err) {
			res.status(500).json({error: true, data: {message: err.message}})
		})
    })
    .catch(model.Rubro.NotFoundError, function (err) {
        res.status(404).json({error: true, data: {message: 'Rubro not found'}})
    })
	.catch(function (err) {
		res.status(500).json({error: true, data: {message: err.message}})
	})
}

var deleteRubro = function (req, res) {
	new model.Rubro({IDEN_RUBRO: req.params.id})
	.destroy({require: true})
	.then(function () {
		res.json({error: false, data: {message: 'Rubro successfully deleted'}})
	})
	.catch(model.Rubro.NoRowsDeletedError, function() {
		res.status(404).json({error: true, data: {message: 'Rubro not found'}})
	})
	.catch(function (err) {
		res.status(500).json({error: true, data: {message: err.message}})
	})
}

/* Exports all methods */
module.exports = {
  getRubro,
	postRubro,
	putRubro,
	deleteRubro
}
