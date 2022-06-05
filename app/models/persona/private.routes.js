import express from 'express';
import * as controller from './controller.js';
// import permit from '../../middlewares/permission.js'
const app = express.Router();

// Pendiente esta wea ctm
app.route('/persona/:id([0-9]+)?')
  .post((req, res) => controller.POST(req, res))
  .put((req, res) => controller.PUT(req, res))
  .delete((req, res) => controller.DELETE(req, res));

export default app;
