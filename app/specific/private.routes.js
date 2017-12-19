import express from 'express'
import clientes from './private/clientes'
import administradores from './private/administradores'
import comentarios from './private/miscomentarios'

import inject from '../middlewares/injection'

const app = express.Router()

app.route('/clientes')
  .get   ((req,res) => clientes.GET(req, res))

app.route('/administradores')
  .get   ((req,res) => administradores.GET(req, res))

app.route('/miscomentarios')
  .get   (inject.IDEN_EMPRENDEDOR(), (req,res) => comentarios.GET(req, res))

export default app
