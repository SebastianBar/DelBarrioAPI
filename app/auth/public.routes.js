import express from 'express';
import * as controller from './controller.js';

const app = express.Router();

app.route('/auth')
  .post((req, res) => controller.authenticate(req, res));

export default app;
