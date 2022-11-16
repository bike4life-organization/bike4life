import { NextFunction, Request, Response } from "express"
import {logger} from '@bike4life/commons'
import { HttpException } from "../exceptions/http-exception";

const errorMiddleware = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';

    logger.error(`[${req.method} ${req.path}] >> Status code: ${status}, Message: ${message}`);
  } catch (error) {
    next(error)
  }
}

export default errorMiddleware