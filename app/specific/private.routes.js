import express from 'express';
import * as clientes from './private/clientes.js';
import * as administradores from './private/administradores.js';

const app = express.Router();

app.route('/clientes')
  .get((req, res) => clientes.GET(req, res));

app.route('/administradores')
  .get((req, res) => administradores.GET(req, res));

export default app;
