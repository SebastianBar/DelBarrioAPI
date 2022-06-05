import _ from 'lodash';
import { bookshelf } from '../../connection.js';
import * as publicacionController from '../../models/publicacion/controller.js';

export const GET = async (req, res) => {
  if (!req.query.search) {
    res.status(400).json({ error: true, data: { message: 'search parameter is required' } });
  } else {
    try {
      const data = await bookshelf.knex.raw('SELECT * FROM search_posts(?::varchar)', [req.query.search]);
      if (data.rows.length > 0) {
        req.query.ids = _.map(data.rows, 'IDEN_PUBLICACION');
        publicacionController.GET(req, res);
      }
      res.status(404).json({ error: true, data: { message: 'No results found' } });
    } catch (err) {
      res.status(500).json({ error: true, data: { message: 'Internal error' } });
    }
  }
};
