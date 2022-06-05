import express from 'express';
import * as controller from './controller.js';
import permit from '../../middlewares/permission.js';

const app = express.Router();

app.route('/respuesta/:id([0-9]+)?')
  .get(permit(105), (req, res) => controller.GET(req, res))
  .post(permit(217), (req, res) => controller.POST(req, res))
  .put(permit(219), (req, res) => controller.PUT(req, res));
// .delete ((req,res) => controller.DELETE(req, res))

export default app;
