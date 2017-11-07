'use strict'
import controller from './controller'
import express from 'express'
const app = express.Router()

app.route('/categoria/:id?')
  .get    ((req,res) => controller.getCategoria(req, res))
  .post   ((req,res) => controller.postCategoria(req, res))
  .put    ((req,res) => controller.putCategoria(req, res))
  .delete ((req,res) => controller.deleteCategoria(req, res))
  .patch  ((req,res) => controller.patchCategoria(req, res))

export default app
