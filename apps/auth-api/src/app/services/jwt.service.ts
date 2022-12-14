import { User } from '@bike4life/commons';
import * as jwt from 'jsonwebtoken';
import { secretSettings } from '../settings'

export class JwtService {
  public static generateToken(user: User): string {
    const payload = {
      email: user.email,
      username: user.username,
      _id: user._id,
    }
    return jwt.sign(payload, secretSettings.jwt, {
      expiresIn: '1h',
    })
  }
}
