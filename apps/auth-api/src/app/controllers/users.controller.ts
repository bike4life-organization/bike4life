import { AuthenticatedRequest, checkError } from '@bike4life/commons';
import { NextFunction, Request, Response } from 'express';
import { NotifierService } from '../services/notifier.service';
import { UserService } from '../services/user.service';

class UsersController {
  private usersService: UserService
  private notifierService: NotifierService

  constructor() {
    this.usersService = new UserService();
    this.notifierService = new NotifierService();
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
      const newUser = await this.usersService.create(user)
      await this.notifierService.sendUserCreatedEvent(newUser)
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
