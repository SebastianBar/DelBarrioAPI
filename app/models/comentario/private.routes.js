import controller from './controller'
import express from 'express'
import permit from '../../middlewares/permission'
const app = express.Router()

app.route('/comentario/:id([0-9]+)?')
  .get    (permit(104), (req,res) => controller.GET(req, res))
  .post   (permit(216), (req,res) => controller.POST(req, res))
  .put    (permit(218), (req,res) => controller.PUT(req, res))
  // .delete ((req,res) => controller.DELETE(req, res))

export default app
