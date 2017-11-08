'use strict'
import controller from './controller'
import express from 'express'
const app = express.Router()

app.route('/rol/:id?')
  .get    ((req,res) => controller.getRol(req, res))
  .post   ((req,res) => controller.postRol(req, res))
  .put    ((req,res) => controller.putRol(req, res))
  .delete ((req,res) => controller.deleteRol(req, res))

export default app
