import express from 'express';
import * as controller from './controller.js';
import permit from '../../middlewares/permission.js';

const app = express.Router();

app.route('/motivo_deshabilitacion/:id([0-9]+)?')
  .get(permit(102), (req, res) => controller.GET(req, res))
  .post(permit(204), (req, res) => controller.POST(req, res))
  .put(permit(204), (req, res) => controller.PUT(req, res));
// .delete ((req,res) => controller.DELETE(req, res))

export default app;
