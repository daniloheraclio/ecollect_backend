import express from 'express';
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/', (req, res) => {
  console.log('server started on port 3333');
  return res.json({ message: 'hello world' });
});

routes.get('/items', itemsController.index);

routes.post('/points', pointsController.create);

routes.get('/points/:id', pointsController.show);

export default routes;