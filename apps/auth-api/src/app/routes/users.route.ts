import { Router } from 'express'
import { Routes } from '@bike4life/api-interfaces'
import UsersController from '../controllers/users.controller'
import { authMiddleware } from '@bike4life/commons'

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/login`, this.usersController.login)
    this.router.post(this.path, this.usersController.create)

    // Authenticated requests
    this.router.use(authMiddleware)
    this.router.get(`${this.path}/me`, this.usersController.me)
    this.router.delete(`${this.path}`, this.usersController.delete)
    this.router.put(`${this.path}`, this.usersController.update)
  }
}

export default UsersRoute;
