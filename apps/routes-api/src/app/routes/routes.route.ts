import { Router } from 'express';
import { Routes } from '@bike4life/api-interfaces';
import RoutesController from '../controllers/routes.controller';

class RoutesRoute implements Routes {
  public path = '/routes';
  public router = Router();
  public routesController = new RoutesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.put(`${this.path}/:id`, this.routesController.updateRoute);
  }
}

export default RoutesRoute;