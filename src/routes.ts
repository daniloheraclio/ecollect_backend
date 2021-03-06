import express from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

// index (varios), show(um), create, update, delete

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/', (req, res) => {
  console.log('server started on port 3333');
  return res.json({ message: 'hello world' });
});

routes.get('/items', itemsController.index);

routes.post('/points', upload.single('image'), pointsController.create);

routes.get('/points/:id', pointsController.show);

routes.get('/points/', pointsController.index);

export default routes;