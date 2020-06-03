import express from 'express';
import knex from './database/connection';

const routes = express.Router();

routes.get('/', (req, res) => {
  console.log('server started on port 3333');
  return res.json({ message: 'hello world' });
});

routes.get('/items', async (req, res) => {
  const items = await knex('items').select('*');

  const itemsSerialized = items.map(item => {
    return {
      id: item.id,
      title: item.title,
      image_url: `http://localhost:3333/uploads/${item.image}`,
    }
  })
  return res.json(itemsSerialized);
});

routes.post('/points', async (req, res) => {
  const {
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    state,
    items
  } = req.body;

  const ids = await knex('points').insert({
    image: 'fake_image',
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    state
  });

  const pointItems = items.map((item_id: Number) => {
    return {
      item_id,
      point_id: ids[0],
    }
  })
  await knex('point_items').insert(pointItems);

  return res.json({ success: true })
  
});

export default routes;