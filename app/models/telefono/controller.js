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

var getTelefono = function (req, res) {
  const telefonoId = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(telefonoId != 0) {
    new model.Telefono({IDEN_FONO: telefonoId}).fetch({withRelated: ['usuario']})
      .then(telefono => {
        if(!telefono) {
          res.status(404).json({error: true, data: {message: 'Telefono not found'}})
        } else {
          res.json({error: false, data: telefono.toJSON()})
        }
      }).catch(err => {
        res.status(500).json({error: true, data: {message: err.message}})
        throw err
      })
  } else {
    new model.Telefonos().fetch({withRelated: ['usuario']})
      .then(telefonos => {
        res.json({error: false, data: telefonos.toJSON()})
      }).catch(err => {
        res.status(500).json({error: true, data: {message: err.message}})
        throw err
      })
  }
}

var postTelefono = function (req, res) {
  new model.Telefono({
    CODI_FONO:    req.body.CODI_FONO,
    NUMR_FONO:    req.body.NUMR_FONO,
    IDEN_USUARIO: req.body.IDEN_USUARIO
  }).save()
    .then(telefono => {
      res.json({error: false, data: telefono.toJSON()})
    }).catch(err => {
      res.status(500).json({error: true, data: {message: err.message}})
      throw err
    })
}

var putTelefono = function (req, res) {
  new model.Telefono({IDEN_FONO: req.params.id})
    .fetch({require: true})
    .then(telefono => {
      telefono.save({
        CODI_FONO:	  req.body.CODI_FONO || telefono.get('CODI_FONO'),
        NUMR_FONO:	  req.body.NUMR_FONO || telefono.get('NUMR_FONO'),
        IDEN_USUARIO:	req.body.IDEN_USUARIO || telefono.get('IDEN_USUARIO'),
      })
        .then(() => {
          res.json({error: false, data: {message: 'Telefono successfully updated'}})
        })
        .catch(err => {
          res.status(500).json({error: true, data: {message: 'Internal error'}})
          throw err
        })
    })
    .catch(model.Telefono.NotFoundError, () => {
      res.status(404).json({error: true, data: {message: 'Telefono not found'}})
    })
    .catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

var deleteTelefono = function (req, res) {
  new model.Telefono({IDEN_FONO: req.params.id})
    .destroy({require: true})
    .then(() => {
      res.json({error: false, data: {message: 'Telefono successfully deleted'}})
    })
    .catch(model.Telefono.NoRowsDeletedError, () => {
      res.status(404).json({error: true, data: {message: 'Telefono not found'}})
    })
    .catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

/* Exports all methods */
module.exports = {
  getTelefono,
  postTelefono,
  putTelefono,
  deleteTelefono
}
