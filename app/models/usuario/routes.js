'use strict'
import controller from './controller'
import express from 'express'
const app = express.Router()

app.route('/usuario/:id?')
  .get    ((req,res) => controller.getUsuario(req, res))
  .post   ((req,res) => controller.postUsuario(req, res))
  // .put    ((req,res) => controller.putUsuario(req, res))
  .delete ((req,res) => controller.deleteUsuario(req, res))

export default app
