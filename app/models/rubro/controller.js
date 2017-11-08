'use strict'
var model = require('./model')

/*
**** METODOS HTTP UTILIZADOS ****
* GET:      Obtener recursos
* POST:     Crear un nuevo recurso
* PUT:      Editar un recurso
* DELETE:   Elimina un recurso
* PATCH:    Editar partes concretas de un recurso
*/

var getRubro = function (req, res) {
  const rubroId = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(rubroId != 0) {
    new model.Rubro({IDEN_RUBRO: rubroId}).fetch()
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
    new model.Rubros().fetch()
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
    NOMB_RUBRO:   req.body.NOMB_RUBRO,
    FLAG_VIGENTE: req.body.FLAG_VIGENTE
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
        NOMB_RUBRO:   req.body.NOMB_RUBRO || rubro.get('NOMB_RUBRO'),
        FLAG_VIGENTE: req.body.FLAG_VIGENTE || rubro.get('FLAG_VIGENTE'),
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

var patchRubro = function (req, res) {
  new model.Rubro({IDEN_RUBRO: req.params.id})
    .fetch({require: true})
    .then(rubro => {
      rubro.save({
        FLAG_VIGENTE:	req.body.FLAG_VIGENTE
      }, {patch: true})
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

/* Exports all methods */
module.exports = {
  getRubro,
  postRubro,
  putRubro,
  deleteRubro,
  patchRubro
}
