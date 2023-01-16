import { HttpException } from './http-exception'

export function checkError(err: HttpException) {
  if (err.message.includes('validation failed')) {
    return new HttpException(400, err.message)
  }
  if (err.message.includes('duplicate key error')) {
    return new HttpException(409, err.message)
  }
  if (err.message.includes('Cast to ObjectId failed')) {
    return new HttpException(400, 'Invalid ID')
  }
  if (err.message.includes('not found')) {
    return new HttpException(404, err.message)
  }
  if (err.message.includes('You are not allowed to access this resource')) {
    return new HttpException(403, err.message)
  }
  return err
}
