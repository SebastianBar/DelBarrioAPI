'use strict'
import controller from './controller'
import express from 'express'
const app = express.Router()

app.route('/persona/:id?')
  .get    ( (req,res) => controller.getPersona(req, res) )
  .post   ( (req,res) => controller.postPersona(req, res) )
  .put    ( (req,res) => controller.putPersona(req, res) )
  .delete ( (req,res) => controller.deletePersona(req, res) )

export default app
