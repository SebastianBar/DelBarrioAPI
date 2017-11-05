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
      .then(rubro => {
        if(!rubro) {
          res.status(404).json({error: true, data: {message: 'Rubro not found'}})
        } else {
          res.json({error: false, data: rubro.toJSON()})
        }
      }).catch(err => {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  } else {
    new model.Rubros().fetch({withRelated: ['emprendedores']})
      .then(rubros => {
        res.json({error: false, data: rubros.toJSON()})
      }).catch(err => {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  }
}

var postRubro = function (req, res) {
  new model.Rubro({
    FLAG_CONTENIDO_ADULTO: req.body.FLAG_CONTENIDO_ADULTO,
    NOMB_RUBRO: req.body.NOMB_RUBRO,
    DESC_RUBRO: req.body.DESC_RUBRO
  }).save()
    .then(rubro => {
      res.json({error: false, data: rubro.toJSON()})
    }).catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

var putRubro = function (req, res) {
  new model.Rubro({IDEN_RUBRO: req.params.id})
    .fetch({require: true})
    .then(rubro => {
      rubro.save({
        CODI_RUBRO:	req.body.CODI_RUBRO || rubro.get('CODI_RUBRO'),
        NOMB_RUBRO:	req.body.NOMB_RUBRO || rubro.get('NOMB_RUBRO'),
        FLAG_CONTENIDO_ADULTO:	req.body.FLAG_CONTENIDO_ADULTO || rubro.get('FLAG_CONTENIDO_ADULTO'),
      })
        .then(() => {
          res.json({error: false, data: {message: 'Rubro successfully updated'}})
        })
        .catch(err => {
          res.status(500).json({error: true, data: {message: 'Internal error'}})
          throw err
        })
    })
    .catch(model.Rubro.NotFoundError, () => {
      res.status(404).json({error: true, data: {message: 'Rubro not found'}})
    })
    .catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

var deleteRubro = function (req, res) {
  new model.Rubro({IDEN_RUBRO: req.params.id})
    .destroy({require: true})
    .then(() => {
      res.json({error: false, data: {message: 'Rubro successfully deleted'}})
    })
    .catch(model.Rubro.NoRowsDeletedError, () => {
      res.status(404).json({error: true, data: {message: 'Rubro not found'}})
    })
    .catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

/* Exports all methods */
module.exports = {
  getRubro,
  postRubro,
  putRubro,
  deleteRubro
}
