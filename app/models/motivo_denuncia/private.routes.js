import express from 'express';
import * as controller from './controller.js';
import permit from '../../middlewares/permission.js';

const app = express.Router();

app.route('/motivo_denuncia/:id([0-9]+)?')
  .get(permit(101), (req, res) => controller.GET(req, res))
  .post(permit(203), (req, res) => controller.POST(req, res))
  .put(permit(203), (req, res) => controller.PUT(req, res));
// .delete ((req,res) => controller.DELETE(req, res))

export default app;
