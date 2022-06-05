import express from 'express';
import * as search from './public/search_posts.js';
import * as index from './public/index.js';

const app = express.Router();

app.route('/search')
  .get((req, res) => search.GET(req, res));

app.route('/index')
  .get((req, res) => index.GET(req, res));

export default app;
