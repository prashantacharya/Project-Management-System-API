import knex from 'knex';
import bookshelf from 'bookshelf';
import { config } from 'dotenv';
config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;
export const knexConnection = knex({
  client: 'pg',
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    charset: 'utf8',
  },
});

export default bookshelf(knexConnection);
