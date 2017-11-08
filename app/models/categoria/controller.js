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

var getCategoria = function (req, res) {
  const categoriaId = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(categoriaId != 0) {
    new model.Categoria({IDEN_CATEGORIA: categoriaId}).fetch({withRelated: ['subcategorias']})
      .then(categoria => {
        if(!categoria) {
          res.status(404).json({error: true, data: {message: 'Categoria not found'}})
        } else {
          res.json({error: false, data: categoria.toJSON()})
        }
      }).catch(err => {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  } else {
    new model.Categorias().query(query => {
      query.where('IDEN_CATEGORIA_PADRE', null)
    })
      .fetch({withRelated: ['subcategorias']})
      .then(categorias => {
        res.json({error: false, data: categorias.toJSON()})
      }).catch(err => {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  }
}

var postCategoria = function (req, res) {
  new model.Categoria({
    NOMB_CATEGORIA:       req.body.NOMB_CATEGORIA,
    IDEN_CATEGORIA_PADRE: req.body.IDEN_CATEGORIA_PADRE,
    FLAG_VIGENTE:         req.body.FLAG_VIGENTE
  }).save()
    .then(categoria => {
      res.json({error: false, data: categoria.toJSON()})
    }).catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

var putCategoria = function (req, res) {
  new model.Categoria({IDEN_CATEGORIA: req.params.id})
    .fetch({require: true})
    .then(categoria => {
      categoria.save({
        NOMB_CATEGORIA:	      req.body.NOMB_CATEGORIA || categoria.get('NOMB_CATEGORIA'),
        IDEN_CATEGORIA_PADRE:	req.body.IDEN_CATEGORIA_PADRE || categoria.get('IDEN_CATEGORIA_PADRE'),
        FLAG_VIGENTE:	req.body.FLAG_VIGENTE || categoria.get('FLAG_VIGENTE'),
      })
        .then(() => {
          res.json({error: false, data: {message: 'Categoria successfully updated'}})
        })
        .catch(err => {
          res.status(500).json({error: true, data: {message: 'Internal error'}})
          throw err
        })
    })
    .catch(model.Categoria.NotFoundError, () => {
      res.status(404).json({error: true, data: {message: 'Categoria not found'}})
    })
    .catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

var deleteCategoria = function (req, res) {
  new model.Categoria({IDEN_CATEGORIA: req.params.id})
    .destroy({require: true})
    .then(() => {
      res.json({error: false, data: {message: 'Categoria successfully deleted'}})
    })
    .catch(model.Categoria.NoRowsDeletedError, () => {
      res.status(404).json({error: true, data: {message: 'Categoria not found'}})
    })
    .catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

var patchCategoria = function (req, res) {
  new model.Categoria({IDEN_CATEGORIA: req.params.id})
    .fetch({require: true})
    .then(categoria => {
      categoria.save({
        FLAG_VIGENTE:	req.body.FLAG_VIGENTE
      }, {patch: true})
        .then(() => {
          res.json({error: false, data: {message: 'Categoria successfully updated'}})
        })
        .catch(err => {
          res.status(500).json({error: true, data: {message: 'Internal error'}})
          throw err
        })
    })
    .catch(model.Categoria.NotFoundError, () => {
      res.status(404).json({error: true, data: {message: 'Categoria not found'}})
    })
    .catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

/* Exports all methods */
module.exports = {
  getCategoria,
  postCategoria,
  putCategoria,
  deleteCategoria,
  patchCategoria
}
