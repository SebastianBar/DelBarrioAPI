'use strict'
import controller from './controller'
import express from 'express'
const app = express.Router()

app.route('/permiso/:id?')
  .get    ((req,res) => controller.getPermiso(req, res))

export default app
