import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// todas as rotas abaixo da chamada desse metodo passarao pelo middleware
routes.use(authMiddleware);

routes.put('/users', UserController.update);

export default routes;
