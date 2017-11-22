import { bookshelf } from '../connection'

function POST (req, res) {
  if(!req.body.search) {
    res.status(400).json({ error: true, data: { message: 'search parameter is required' } })
  } else {
    bookshelf.knex.raw('SELECT * FROM search_posts(?::varchar)', [req.body.search])
      .then(data => {
        if(data.rows.length > 0) {
          res.json({ error: false, data: data.rows})
        } else {
          res.status(404).json({ error: true, data: { message: 'No results found' } })
        }
      })
      .catch(err => {
        res.status(500).json({ error: true, data: { message: 'Internal error' } })
        throw err
      })
  }
}

/* Se exportan los métodos */
module.exports = {
  POST
}
