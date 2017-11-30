import search from './search_posts'
import express from 'express'
const app = express.Router()

app.route('/search')
  .get   ((req,res) => search.GET(req, res))

export default app
