import express from 'express';
import * as controller from './controller.js';
// import permit from '../../middlewares/permission.js'
const app = express.Router();

app.route('/usuario/:id([0-9]+)?')
  .get((req, res) => controller.GET(req, res))
  .post((req, res) => controller.POST(req, res))
  .put((req, res) => controller.PUT(req, res)); // Pendiente 206, 207, 208, blabla
// .delete ((req,res) => controller.DELETE(req, res))

export default app;
