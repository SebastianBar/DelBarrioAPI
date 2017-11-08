'use strict'
var model = require('./model')

/*
**** METODOS HTTP UTILIZADOS ****
* GET:      Obtener recursos
* POST:     Crear un nuevo recurso
* PUT:      Editar un recurso
* DELETE:   Elimina un recurso
*/

var GET = function (req, res) {
  const faqId = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(faqId != 0) {
    new model.Faq({IDEN_FAQ: faqId}).fetch()
      .then(faq => {
        if(!faq) {
          res.status(404).json({error: true, data: {message: 'FAQ not found'}})
        } else {
          res.json({error: false, data: faq.toJSON()})
        }
      }).catch(err => {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  } else {
    new model.Faqs().fetch()
      .then(faqs => {
        res.json({error: false, data: faqs.toJSON()})
      }).catch(err => {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  }
}

var POST = function (req, res) {
  new model.Faq({
    NOMB_FAQ: req.body.NOMB_FAQ,
    DESC_FAQ: req.body.DESC_FAQ
  }).save()
    .then(faq => {
      res.json({error: false, data: faq.toJSON()})
    }).catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

var PUT = function (req, res) {
  new model.Faq({IDEN_FAQ: req.params.id})
    .fetch({require: true})
    .then(faq => {
      faq.save({
        NOMB_FAQ:	req.body.NOMB_FAQ || faq.get('NOMB_FAQ'),
        DESC_FAQ:	req.body.DESC_FAQ || faq.get('DESC_FAQ')
      })
        .then(() => {
          res.json({error: false, data: {message: 'FAQ successfully updated'}})
        })
        .catch(err => {
          res.status(500).json({error: true, data: {message: 'Internal error'}})
          throw err
        })
    })
    .catch(model.Faq.NotFoundError, () => {
      res.status(404).json({error: true, data: {message: 'FAQ not found'}})
    })
    .catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

var DELETE = function (req, res) {
  new model.Faq({IDEN_FAQ: req.params.id})
    .destroy({require: true})
    .then(() => {
      res.json({error: false, data: {message: 'FAQ successfully deleted'}})
    })
    .catch(model.Faq.NoRowsDeletedError, () => {
      res.status(404).json({error: true, data: {message: 'FAQ not found'}})
    })
    .catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

/* Exports all methods */
module.exports = {
  GET,
  POST,
  PUT,
  DELETE
}
