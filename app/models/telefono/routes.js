'use strict'
import controller from './controller'
import express from 'express'
const app = express.Router()

app.route('/telefono/:id?')
  .get    ((req,res) => controller.getTelefono(req, res))
  .post   ((req,res) => controller.postTelefono(req, res))
  .put    ((req,res) => controller.putTelefono(req, res))
  .delete ((req,res) => controller.deleteTelefono(req, res))

export default app
