import Knex from 'knex';
import Bookshelf from 'bookshelf';
import cn from '../config.js';

// Se inicializa el Query Builder
export const knex = Knex(cn.knexConfig);

// Se inicializa el ORM
export const bookshelf = Bookshelf(knex);
