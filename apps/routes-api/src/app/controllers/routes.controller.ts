import { checkError } from '@bike4life/commons';
import { NextFunction, Request, Response } from 'express';
import { RoutesService } from '../services/routes.service';

class RoutesController {
  private routesService: RoutesService

  constructor() {
    this.RoutesService = new RoutesService();
  }

  public get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const route = await this.routesService.getRouteById(id)
      res.send(route)
    } catch (error) {
      next(error);
    }
  }
}

export default RoutesController;
