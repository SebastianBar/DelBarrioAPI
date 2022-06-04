import { bookshelf } from '../../connection'
import _ from 'lodash'
import publicacionController from '../../models/publicacion/controller'

const GET = async (req, res) => {
  if (!req.query.search) {
    res.status(400).json({ error: true, data: { message: 'search parameter is required' } })
  } else {
    try {
      const data = await bookshelf.knex.raw('SELECT * FROM search_posts(?::varchar)', [req.query.search])
      if (data.rows.length > 0) {
        req.query.ids = _.map(data.rows, 'IDEN_PUBLICACION')
        return publicacionController.GET(req, res)
      } else {
        res.status(404).json({ error: true, data: { message: 'No results found' } })
      }
    } catch (err) {
      res.status(500).json({ error: true, data: { message: 'Internal error' } })
    }
  }
}

/* Se exportan los métodos */
module.exports = {
  GET
}
