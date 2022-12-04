import { AuthenticatedRequest, checkError } from '@bike4life/commons';
import { NextFunction, Request, Response } from 'express';
import { RoutesService } from '../services/routes.service';

class RoutesController {

  private routesService: RoutesService

  constructor() {
    this.routesService = new RoutesService();
  }

  public removeRoute = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const id_route = req.params._id
      const id_route_user = req.params.userId
      const id_user = req.user._id
      if( id_route_user = id_user){
        this.routesService.removeRoute(id_route)
        res.sendStatus(200)
      }else {
        res.sendStatus(403)    
      }
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
      this.routesService.createRoute(newRoute)
      res.sendStatus(200)

    } catch (error) {
      next(error)
    }
  }

  public updateRoute = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {

      const newRoute = req.body
      const idRoute = req.params.id

      const id_route_user = req.params.userId
      const id_user = req.user._id

      if( id_route_user = id_user){
        this.routesService.updateRoute(newRoute, idRoute)
        res.sendStatus(200)
      }else {
        res.sendStatus(403)    
      }
    } catch (error) {
      next(error)
    }
  }
}
export default RoutesController;
