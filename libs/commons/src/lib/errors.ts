import { HttpException } from './http-exception'

export function checkError(err: HttpException) {
  if (err.message.includes('validation failed')) {
    return new HttpException(400, err.message)
  }
  return err
}
