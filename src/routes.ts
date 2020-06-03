import express from 'express';
import knex from './database/connection';

const routes = express.Router();

routes.get('/', (req, res) => {
  console.log('server started on port 3333');
  return res.json({ message: 'hello world' });
});

routes.get('/items', async (req, res) => {
  const items = await knex('items').select('*');

  return res.json(items);
});

export default routes;