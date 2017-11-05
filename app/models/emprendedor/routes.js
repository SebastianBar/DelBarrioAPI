'use strict'
import controller from './controller'
import express from 'express'
const app = express.Router()

app.route('/emprendedor/:id?')
  .get    ((req,res) => controller.getEmprendedor(req, res))
  .post   ((req,res) => controller.postEmprendedor(req, res))
  .put    ((req,res) => controller.putEmprendedor(req, res))
  .delete ((req,res) => controller.deleteEmprendedor(req, res))

export default app
