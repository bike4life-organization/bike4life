import { Router } from 'express';
import { Routes } from '@bike4life/api-interfaces';
import UsersController from '../controllers/users.controller';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.usersController.get)
    this.router.post(this.path, this.usersController.create)
  }
}

export default UsersRoute;