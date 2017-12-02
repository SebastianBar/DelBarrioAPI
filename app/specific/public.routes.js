import express from 'express'
import search from './search_posts'
import index from './index'
const app = express.Router()

app.route('/search')
  .get   ((req,res) => search.GET(req, res))

app.route('/index')
  .get   ((req,res) => index.GET(req, res))

export default app
