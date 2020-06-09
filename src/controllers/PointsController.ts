import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex('points').where('id', id).first();

    if(!point) {
      return response.status(400).json({ message: 'Point not found.' });
    }

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');
    
    return response.json({ point, items });
  }

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      state,
      items,
    } = request.body;
  
    const trx = await knex.transaction();

    const point = {
      image:
        'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      state,
    };

    const insertedIds = await trx('points').insert(point);
  
    const point_id = insertedIds[0]
    
    const pointItems = items.map((item_id: Number) => {
      return {
        item_id,
        point_id,
      }
    })
    
    await trx('point_items').insert(pointItems);
  
    await trx.commit();

    return response.json({ 
      id: point_id,
      ...point,
    })
    
  }
}

export default PointsController;