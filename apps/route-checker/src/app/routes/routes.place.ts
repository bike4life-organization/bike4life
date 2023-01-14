import { Router } from 'express';
import { Routes } from '@bike4life/api-interfaces';
import InterestingPlacesController from '../controllers/interesting.places.controller';
import { SecretKeyMiddleware } from "../middlewares/secret.key.middleware";


class RoutesPlace implements Routes {
  public path = '/places';
  public router = Router();
  public interestingPlacesController = new InterestingPlacesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(SecretKeyMiddleware)
    this.router.get(`${this.path}/:id`, this.interestingPlacesController.get)
  }
}

export default RoutesPlace;
