import express from 'express';
import * as controller from './controller.js';
import permit from '../../middlewares/permission.js';

const app = express.Router();

app.route('/telefono/:id([0-9]+)?')
  .post((req, res) => controller.POST(req, res)) // Heredar 206, 207, 208
  .put((req, res) => controller.PUT(req, res)) // Heredar 206, 207, 208
  .delete(permit(303), (req, res) => controller.DELETE(req, res));

export default app;
