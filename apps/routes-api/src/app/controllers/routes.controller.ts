import { NextFunction, Request, Response } from 'express';
import { RoutesService }  from '../services/routes.service';

class RoutesController {

    private routesService:  RoutesService

    constructor(){
        this.routesService = new RoutesService();
    }

    public removeRoute = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const  id  = req.params.id
        this.routesService.removeRoute(id)
        res.sendStatus(200)
      } catch (error) {
        next(error);
      }
    }
}
export default RoutesController;
