import { Router } from 'express';
import { Routes } from '@bike4life/api-interfaces';
import RoutesController from '../controllers/routes.controller';
import { authMiddleware } from '@bike4life/commons'


class RoutesRoute implements Routes {
  public path = '/routes';
  public router = Router();
  public routesController = new RoutesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(authMiddleware)
    this.router.post(`${this.path}`, this.routesController.createRoute)
    this.router.get(`${this.path}`, this.routesController.list)
    this.router.get(`${this.path}/:id`, this.routesController.get)
    this.router.delete(`${this.path}/:id`, this.routesController.removeRoute)
    this.router.put(`${this.path}/:id`, this.routesController.updateRoute)
  }
}

export default RoutesRoute;
