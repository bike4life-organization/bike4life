import { checkError } from '@bike4life/commons';
import { NextFunction, Request, Response } from 'express';
import { RoutesService }  from '../services/routes.service';

class RoutesController {
 
    private routesService:  RoutesService

    constructor(){
        this.routesService = new RoutesService();
    }

  public updateRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const newRoute = req.body
      const idRoute = req.params.id
      this.routesService.updateRoute(newRoute,idRoute)
      res.sendStatus(201)


    } catch (error) {
      next(error)
    }
  };
}

export default RoutesController;