import {NextFunction, Request, Response} from "express";
import {HttpException} from "@bike4life/commons";

export const SecretKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const secretKey = req.header('secret_key');
        if (!secretKey || secretKey !== process.env.API_SECRET_KEY) {
            throw new Error('No secret key provided')
        }
        next()
    } catch (error) {
        const unauthorizedError = new HttpException(401, 'Unauthorized')
        next(unauthorizedError)
    }
}
