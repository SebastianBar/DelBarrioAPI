import express from 'express';
import * as controller from './controller.js';
import permit from '../../middlewares/permission.js';

const app = express.Router();

app.route('/emprendedor/:id([0-9]+)?')
  .get(permit(103), (req, res) => controller.GET(req, res)) // Revisar
  .post(permit(225), (req, res) => controller.POST(req, res))
  .put((req, res) => controller.PUT(req, res)); // Pendiente
// .delete ((req,res) => controller.DELETE(req, res))

export default app;
