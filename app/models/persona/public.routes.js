import express from 'express';
import * as controller from './controller.js';

const app = express.Router();

app.route('/persona/:id([0-9]+)?')
  .get((req, res) => controller.GET(req, res));

export default app;
