import { NextFunction, Request, Response } from 'express';
import { RoutesService }  from '../services/routes.service';

class RoutesController {

    private routesService:  RoutesService

    constructor(){
        this.routesService = new RoutesService();
    }

  public createRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newRoute = req.body

      console.log(`newRoute: ${JSON.stringify(newRoute, null, 2)}`)


      this.routesService.createRoute(newRoute)
      res.sendStatus(200)
  
    } catch (error) {
      next(error)
    }
  };
}
export default RoutesController;