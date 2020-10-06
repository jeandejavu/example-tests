import { Router } from 'express';
import MainController from '../controllers/MainController';

const routes = Router();

routes.get('/', MainController.checkConnection);
routes.post('/calcular', MainController.calculate);

export default routes;
