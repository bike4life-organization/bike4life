import { NextFunction, Response } from "express"
import { verify } from "jsonwebtoken"
import { HttpException } from "../http-exception"
import { AuthenticatedRequest } from "../types"

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      throw new Error('No token provided')
    }

    verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        throw new Error('Failed to authenticate token')
      }
      req.user = decoded
      next()
    })
  } catch (error) {
    const unauthorizedError = new HttpException(401, 'Unauthorized')
    next(unauthorizedError)
  }
}
