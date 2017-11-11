import controller from './controller'
import express from 'express'
const app = express.Router()

app.route('/usuario')
  .get   ((req,res) => controller.getUsuario(req, res))

export default app
