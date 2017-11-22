import search from './search_posts'
import express from 'express'
const app = express.Router()

app.route('/search')
  .post   ((req,res) => search.POST(req, res))

export default app
