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
* Implementar Relaciones / Herencia
*/

var getEmprendedor = function (req, res) {
  const emprendedorId = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(emprendedorId != 0) {
	  new model.Emprendedor({IDEN_EMPRENDEDOR: emprendedorId}).fetch()
		.then(function (emprendedor) {
		if(!emprendedor) {
            res.status(404).json({error: true, data: {message: 'Emprendedor not found'}})
        } else {
            res.json({error: false, data: emprendedor.toJSON()})
        }
		}).catch(function (err) {
			console.log(err)
			res.status(500).json({error: true, data: {message: err.message}})
    })
  } else {
		new model.Emprendedores().fetch()
		.then(function (emprendedores) {
			res.json({error: false, data: emprendedores.toJSON()})
		}).catch(function (err) {
			console.log(err)
			res.status(500).json({error: true, data: {message: err.message}})
		})
  }
}

var postEmprendedor = function (req, res) {
	new model.Emprendedor({
		IDEN_USUARIO:             req.body.IDEN_USUARIO,
    DESC_EMPRENDEDOR:         req.body.DESC_EMPRENDEDOR,
    DESC_CLAVE_MUNICIPALIDAD: req.body.DESC_CLAVE_MUNICIPALIDAD,
    DESC_NOMBRE_FANTASIA:     req.body.DESC_NOMBRE_FANTASIA,
    DESC_NOMBRE_EMPRESA:      req.body.DESC_NOMBRE_EMPRESA
	}).save()
		.then(function (emprendedor) {
			res.json({error: false, data: emprendedor.toJSON()})
		}).catch(function (err) {
			console.log(err)
			res.status(500).json({error: true, data: {message: err.message}})
		})
}

var putEmprendedor = function (req, res) {
	new model.Emprendedor({IDEN_EMPRENDEDOR: req.params.id})
	.fetch({require: true})
	.then(function (emprendedor) {
		emprendedor.save({
      IDEN_USUARIO:             req.body.IDEN_USUARIO || emprendedor.get('IDEN_USUARIO'),
      DESC_EMPRENDEDOR:         req.body.DESC_EMPRENDEDOR || emprendedor.get('DESC_EMPRENDEDOR'),
      DESC_CLAVE_MUNICIPALIDAD: req.body.DESC_CLAVE_MUNICIPALIDAD || emprendedor.get('DESC_CLAVE_MUNICIPALIDAD'),
      DESC_NOMBRE_FANTASIA:     req.body.DESC_NOMBRE_FANTASIA || emprendedor.get('DESC_NOMBRE_FANTASIA'),
      DESC_NOMBRE_EMPRESA:      req.body.DESC_NOMBRE_EMPRESA || emprendedor.get('DESC_NOMBRE_EMPRESA')
		})
		.then(function () {
			res.json({error: false, data: {message: 'Emprendedor successfully updated'}})
		})
		.catch(function (err) {
			res.status(500).json({error: true, data: {message: err.message}})
		})
    })
    .catch(model.Emprendedor.NotFoundError, function (err) {
        res.status(404).json({error: true, data: {message: 'Emprendedor not found'}})
    })
	.catch(function (err) {
		res.status(500).json({error: true, data: {message: err.message}})
	})
}

var deleteEmprendedor = function (req, res) {
	new model.Emprendedor({IDEN_EMPRENDEDOR: req.params.id})
	.destroy({require: true})
	.then(function () {
		res.json({error: false, data: {message: 'Emprendedor successfully deleted'}})
	})
	.catch(model.Emprendedor.NoRowsDeletedError, function() {
		res.status(404).json({error: true, data: {message: 'Emprendedor not found'}})
	})
	.catch(function (err) {
		res.status(500).json({error: true, data: {message: err.message}})
	})
}

/* Exports all methods */
module.exports = {
  getEmprendedor,
	postEmprendedor,
	putEmprendedor,
	deleteEmprendedor
}
