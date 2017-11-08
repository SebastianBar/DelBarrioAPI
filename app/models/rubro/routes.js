'use strict'
import controller from './controller'
import express from 'express'
const app = express.Router()

app.route('/rubro/:id?')
  .get    ((req,res) => controller.getRubro(req, res))
  .post   ((req,res) => controller.postRubro(req, res))
  .put    ((req,res) => controller.putRubro(req, res))
  .delete ((req,res) => controller.deleteRubro(req, res))
  .patch  ((req,res) => controller.patchRubro(req,res))

export default app
