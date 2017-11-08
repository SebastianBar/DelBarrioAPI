'use strict'
var bookshelf = require('../../connection').bookshelf

var Faq = bookshelf.Model.extend({
  tableName: 'REQ_FAQ',
  idAttribute: 'IDEN_FAQ'
})

var Faqs = bookshelf.Collection.extend({
  model: Faq
})

/* Exports all methods */
module.exports = {
  Faq,
  Faqs,
}
