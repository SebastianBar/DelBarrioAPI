/*
**** METODOS HTTP UTILIZADOS **** 
* GET:      Consultar y leer recursos
* POST:     Permite crear un nuevo recurso
* PUT:      Permite editar un recurso
* DELETE:   Elimina un recurso  
* PATCH:    Permite editar partes concretas de un recurso, recibe los datos mediante x-www-form-urlencode
*/
// {
//   error : '',
//   error_description : ''
// }

'use strict'
import db from '../connection'
var bookshelf = require('../connection').bookshelf

var Persona = bookshelf.Model.extend({
	tableName: 'EMPR_PERsonas'
})

var getPersona = function (req, res) {
  const personaId = (typeof req.params.id === "undefined" || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(personaId != 0) {
	  new Persona().where('PER_Id', personaId)
		.fetch()
		.then(function (persona) {
			res.json(persona)
		}).catch(function (error) {
			console.log(error)
			res.send('An error occured')
    })
  } else {
    new Persona().fetchAll()
		.then(function (personas) {
			res.json(personas)
		}).catch(function (error) {
			console.log(error)
			res.send('An error occured')
		})
  }
}

var savePersona = function (req, res) {
	new Persona({
		PER_Rut: req.body.rut,
		PER_Dv: req.body.dv,
		PER_Nombre: req.body.nombre,
		PER_ApePat: req.body.apepat,
    PER_ApeMat: req.body.apemat,
    PER_Estado: req.body.estado
	}).save()
		.then(function (persona) {
			res.json(persona)
		}).catch(function (error) {
			console.log(error)
			res.send('An error occured')
		})
}

/* Delete a persona */
var deletePersona = function (req, res) {
	var personaId = req.params.id
	new Persona().where('PER_Id', personaId)
		.destroy()
		.catch(function (error) {
			console.log(error)
			res.send('An error occured')
		})
}

/* Exports all methods */
module.exports = {
  getPersona: getPersona,
	savePersona: savePersona,
	//updatePersona: updatePersona,
	deletePersona: deletePersona
}
