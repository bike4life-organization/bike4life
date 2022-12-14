import { AuthenticatedRequest, checkError } from '@bike4life/commons';
import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/user.service';

class UsersController {
  private usersService: UserService

  constructor() {
    this.usersService = new UserService();
  }

  public get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const user = await this.usersService.getUserById(id)
      res.send(user)
    } catch (error) {
      const validatedError = checkError(error)
      next(validatedError);
    }
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body
      if (!user.password) {
        throw new Error('User validation failed: password is required')
      }
      await this.usersService.create(user)
      res.sendStatus(201)
    } catch (error) {
      console.log(error)
      const validatedError = checkError(error)
      next(validatedError);
    }
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body
      const token = await this.usersService.login(email, password)
      res.send({ token })
    } catch (error) {
      console.log(error)
      const validatedError = checkError(error)
      next(validatedError);
    }
  }

  // Authenticated requests

  public me = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { _id } = req.user
      const user = await this.usersService.getUserById(_id)
      res.send(user)
    } catch (error) {
      const validatedError = checkError(error)
      next(validatedError);
    }
  }

  public delete = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { _id } = req.user
      await this.usersService.delete(_id)
      res.sendStatus(204)
    } catch (error) {
      const validatedError = checkError(error)
      next(validatedError);
    }
  }

  public update = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { _id } = req.user
      const user = req.body
      const resultUser = await this.usersService.update(_id, user)
      res.send(resultUser)
    } catch (error) {
      const validatedError = checkError(error)
      next(validatedError);
    }
  }
}

export default UsersController;
