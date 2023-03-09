import { AuthenticatedRequest, checkError } from '@bike4life/commons';
import { NextFunction, Response } from 'express';
import { RoutesService } from '../services/routes.service'

class RoutesController {
  private routesService: RoutesService

  constructor() {
    this.routesService = new RoutesService();
  }

  public removeRoute = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const routeId = req.params.id
      const loggedUserId = req.user._id
      await this.routesService.removeRoute(routeId, loggedUserId)
      res.sendStatus(204)
    } catch (error) {
      const validatedError = checkError(error)
      next(validatedError);
    }
  }

  public list = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const routes = await this.routesService.listRoutes(req.user._id)
      if (!routes) {
        return res.status(404).send({ message: 'Routes not found' })
      }
      res.send(routes)
    } catch (error) {
      const validatedError = checkError(error)
      next(validatedError);
    }
  }

  public get = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const loggedUserId = req.user._id
      const route = await this.routesService.getRouteById(id)
      if (!route._id) {
        return res.status(404).send({ message: 'Route not found' })
      }
      if (route.userId !== loggedUserId) {
        return res.status(403).send({ message: 'You are not allowed to access this route' })
      }
      res.send(route)
    } catch (error) {
      const validatedError = checkError(error)
      next(validatedError);
    }
  }

  public createRoute = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const newRoute = req.body
      newRoute.userId = req.user._id
      newRoute.userEmail = req.user.email
      await this.routesService.createRoute(newRoute)
      res.sendStatus(201)
    } catch (error) {
      const validatedError = checkError(error)
      next(validatedError)
    }
  }

  public updateRoute = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const newRoute = req.body
      const idRoute = req.params.id
      const loggedUserId = req.user._id
      if (newRoute._id) {
        return res.status(403).send({ error: 'The route id is immutable, you can not change it' });
      }
      if (newRoute.date && !Date.parse(newRoute.date)) {
        return res.status(400).send({ error: 'Invalid date format' });
      }
      await this.routesService.updateRoute(newRoute, idRoute, loggedUserId)
      res.sendStatus(200)
    } catch (error) {
      const validatedError = checkError(error)
      next(validatedError)
    }
  }
}
export default RoutesController;
