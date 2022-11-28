import { NextFunction, Request, Response } from 'express';
import { RoutesService } from '../services/routes.service';

class RoutesController {

  private routesService: RoutesService

  constructor() {
    this.routesService = new RoutesService();
  }

  public removeRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id
      await this.routesService.removeRoute(id)
      res.sendStatus(200)
    } catch (error) {
      next(error);
    }
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

  public createRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newRoute = req.body
      await this.routesService.createRoute(newRoute)
      res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  }

  public updateRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newRoute = req.body
      const idRoute = req.params.id
      await this.routesService.updateRoute(newRoute, idRoute)
      res.sendStatus(201)
    } catch (error) {
      next(error)
    }
  }
}
export default RoutesController;
