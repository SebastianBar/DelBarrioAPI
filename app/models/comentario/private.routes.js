import express from 'express';
import * as controller from './controller.js';
import permit from '../../middlewares/permission.js';
import inject from '../../middlewares/injection.js';

const app = express.Router();

app.route('/comentario/:id([0-9]+)?')
  .get(permit(104), (req, res) => controller.GET(req, res))
  .post(permit(216), inject.IDEN_USUARIO(), (req, res) => controller.POST(req, res))
  .put(permit(218), (req, res) => controller.PUT(req, res));
// .delete ((req,res) => controller.DELETE(req, res))

export default app;
