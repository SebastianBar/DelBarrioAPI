import express from 'express';
import * as controller from './controller.js';

const app = express.Router();

app.route('/terminos_condiciones')
  .post((req, res) => controller.POST(req, res)); // Heredar 206, 207, 208

export default app;
